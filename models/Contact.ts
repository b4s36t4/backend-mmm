import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ContactType = HydratedDocument<Contact>;

@Schema()
export class Contact {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  website: string;

  @Prop({ default: new Date() })
  time: Date;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);
