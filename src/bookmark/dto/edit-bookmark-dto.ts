import { IsOptional, IsString } from 'class-validator';

export class UpdateBookMarkDTO {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  link?: string;

  @IsString()
  @IsOptional()
  description?: string;
}
