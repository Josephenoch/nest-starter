import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateBookMarkDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  link: string;

  @IsString()
  @IsOptional()
  description?: string;
}
