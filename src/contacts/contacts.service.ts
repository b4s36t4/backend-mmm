import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Contact } from 'models/Contact';
import { Model } from 'mongoose';

@Injectable()
export class ContactService {
  constructor(
    @InjectModel(Contact.name) private readonly contactModel: Model<Contact>,
  ) {}

  async insertContact({
    name,
    email,
    website,
  }: {
    name: string;
    email: string;
    website: string;
  }): Promise<{ success: boolean; message: string }> {
    const isEmailExists = this.contactModel.findOne({ email });

    if (!!isEmailExists) {
      return { success: false, message: 'Email Already exists' };
    }

    await this.contactModel.create({ email, website, name });

    return { success: true, message: 'Record inserted successfully' };
  }

  async getContacts({
    page = 1,
    per_page = 10,
  }: {
    page?: number;
    per_page?: number;
  }) {
    const skipPage = page * per_page;

    const results = await this.contactModel
      .find({})
      .skip(skipPage)
      .limit(per_page);

    return { message: 'success', data: results };
  }
}
