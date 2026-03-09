import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateCompletedTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description: string;
}