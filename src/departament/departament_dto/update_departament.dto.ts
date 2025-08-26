// src/departament/dto/update-departament.dto.ts
import { IsOptional, IsString, IsNumber, IsInt, Min, Max, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateDeportamentDto {

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Length(1, 255)
  name?: string;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  owner_id?: number;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  status?: number;

}