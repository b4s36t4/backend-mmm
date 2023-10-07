export interface ContactDto {
  readonly email: string;
  readonly website: string;
  readonly name: string;
}

export interface GetContactDto {
  readonly page?: number;
  readonly per_page?: number;
}
