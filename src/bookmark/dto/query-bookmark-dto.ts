import { IsNotEmpty, IsString } from 'class-validator';

export class QueryWithIDBookMarkDTO {
  @IsString()
  @IsNotEmpty()
  id: string;
}
