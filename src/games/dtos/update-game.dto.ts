import { IsOptional } from 'class-validator';

export class UpdateGameDto {
  @IsOptional()
  title: string;

  @IsOptional()
  image_url: string;

  @IsOptional()
  summary: string;

  @IsOptional()
  genre: string;

  @IsOptional()
  release_date: string;
}
