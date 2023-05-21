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

export class UpdateBookMarkDTO {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  link: string;

  @IsString()
  @IsOptional()
  description: string;
}

export class QueryWithIDBookMarkDTO {
  @IsString()
  @IsNotEmpty()
  id: string;
}
