// create-visit.dto.ts
import {IsNotEmpty,IsOptional,IsEnum,IsInt,IsNumber,IsString,IsDateString,} from 'class-validator';
import { VisitState } from '../visit.entity'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';


export class CreateVisitDto {
  //@IsOptional()
  @ApiPropertyOptional()
  @IsInt()
  clientId?: number;

  //@IsOptional()
  @ApiPropertyOptional()
  @IsInt()
  doctorId?: number;
  
  @ApiPropertyOptional({example: '2025-09-12 14:30'})
  @IsNotEmpty()
  @IsDateString()
  visitDateTime: string; // ISO-строка даты, например "2025-09-06T10:30:00"

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  price?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEnum(VisitState)
  state?: VisitState;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  status?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  departament_id?: number

}
