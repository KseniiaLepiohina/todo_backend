import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsNumber()
  @IsOptional()
  userId?: number;
  @IsOptional()
  @IsString()
  title?: string;
  @IsOptional()
  @IsString()
  description?: string;
}
