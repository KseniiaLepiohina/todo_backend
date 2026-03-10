import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsNumber, IsBoolean, IsDate } from 'class-validator';

export class CreateCompletedTaskDto {
 
 @ApiProperty({ example: 7 })
  @IsNumber()
  @IsNotEmpty()
  task_id: number; 
 
  @ApiProperty({ example: 'Купити продукти' }) // Додайте це для Swagger
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'Молоко, хліб', required: false }) // І це
  @IsString()
  description: string;

  @IsBoolean()
  completed:boolean;

  @IsDate()
  completedAt:string;

}