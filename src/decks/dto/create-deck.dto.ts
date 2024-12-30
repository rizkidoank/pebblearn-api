import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateDeckDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsUUID()
  @IsOptional()
  categoryId?: string;
}
