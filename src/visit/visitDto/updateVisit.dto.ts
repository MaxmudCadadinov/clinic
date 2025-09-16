// update-visit.dto.ts
import { IsOptional, IsEnum, IsInt, IsNumber, IsString, IsDateString } from 'class-validator';
import { VisitState } from '../visit.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class UpdateVisitDto {
  @ApiProperty()
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  clientId?: number;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  doctorId?: number;

  @ApiProperty({example: '2025-09-12 14:30'})
  @IsOptional()
  @IsDateString()
  visitDateTime?: string; // ISO строка, например "2025-09-06T15:30:00"

  @ApiProperty()
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Type(() => Number)
  price?: number;

  @ApiProperty()
  @IsOptional()
  @IsEnum(VisitState)
  state?: VisitState;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  status?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  departament_id?: number

}
