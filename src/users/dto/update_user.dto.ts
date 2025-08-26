// src/users/dto/update-user.dto.ts
import { IsOptional, IsString, IsNumber, IsInt, Min, Max, Length, IsNotEmpty, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  @Length(1, 255)
  name?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Length(1, 255)
  user_name?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Length(6, 500)
  password?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Length(10, 255)
  phone?: string;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  @Min(1)
  role_id?: number;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  status?: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  photo?: string;
}