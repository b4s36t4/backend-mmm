import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ContactService } from './contacts.service';
import { ContactDto, GetContactDto } from 'DTO/ContactDto';

@Controller('contacts')
export class ContactsController {
  constructor(private readonly appService: ContactService) {}

  @Post()
  async insertContact(
    @Body() contactDto: ContactDto,
  ): Promise<{ success: boolean }> {
    return this.appService.insertContact(contactDto);
  }

  @Get()
  async getContacts(@Param() getContactDto: GetContactDto) {
    return this.appService.getContacts(getContactDto);
  }
}
