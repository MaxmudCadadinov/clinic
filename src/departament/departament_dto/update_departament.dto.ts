// src/departament/dto/update-departament.dto.ts
import { IsOptional, IsString, IsNumber, IsInt, Min, Max, Length } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateDeportamentDto {

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Length(1, 255)
  name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  owner_id?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  status?: number;

}