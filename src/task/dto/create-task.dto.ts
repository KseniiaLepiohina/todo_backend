import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsNumber()
  userId: number;
  @IsString()
  @IsOptional()
  uuid:string;
  @IsString()
  title: string;
  @IsString()
  @IsOptional()
  description: string;
}
