// src/users/dto/update-user.dto.ts
import { IsOptional, IsString, IsNumber, IsInt, Min, Max, Length, IsNotEmpty, IsBoolean } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Length(1, 255)
  name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Length(1, 255)
  user_name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Length(6, 500)
  password?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Length(10, 255)
  phone?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(1)
  role_id?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  status?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  photo?: string;
}