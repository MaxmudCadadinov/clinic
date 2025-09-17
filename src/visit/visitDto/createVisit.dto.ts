// create-visit.dto.ts
import {IsNotEmpty,IsOptional,IsEnum,IsInt,IsNumber,IsString,IsDateString, MaxLength,} from 'class-validator';
import { VisitState } from '../visit.entity'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';


export class CreateVisitDto {
  @IsOptional()
  @ApiPropertyOptional()
  @IsInt()
  @Type(() => Number)
  clientId?: number;

  
  @ApiPropertyOptional({example: '2025-09-12 14:30'})
  @IsOptional()
  @IsNotEmpty()
  @IsDateString()
  visitDateTime: string; // ISO-строка даты, например "2025-09-06T10:30:00"

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Type(() => Number)
  price?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEnum(VisitState)
  state?: VisitState;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Type(() => Number)
  description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  status?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  departament_id?: number

  @IsInt()
  @IsOptional() // потому что в БД default: 0
  @Type(() => Number)
  is_emergency?: number;

  @IsString()
  @MaxLength(255)
  @IsOptional() // потому что nullable
  emergency_car?: string;

}
