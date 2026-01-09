import { IsOptional, IsString } from 'class-validator';

export class CreateAuthDto {
  @IsString()
  @IsOptional()
  username: string;
  @IsString()
  @IsOptional()
  password: string;
}
