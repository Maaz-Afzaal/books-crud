import { IsNotEmpty } from 'class-validator';

export class BookDto {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly author: string;

  @IsNotEmpty()
  readonly publishedOn: Date;
}
