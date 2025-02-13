import { IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';

export class CreateBookDto {
  @IsNotEmpty()
  @IsString()
  bookCode: string;

  @IsNotEmpty()
  @IsString()
  bookId: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  parallelTitle?: string;

  @IsOptional()
  @IsString()
  librarySection?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  volume?: number;

  @IsOptional()
  @IsString()
  volumeTitle?: string;

  @IsNotEmpty()
  @IsString()
  author: string;

  @IsOptional()
  @IsString()
  coAuthor?: string;

  @IsOptional()
  @IsString()
  translator?: string;

  
  @IsOptional()
  @IsString()
  publisher?: string;

  @IsOptional()
  @IsString()
  publishedYear?: string;
   
}
