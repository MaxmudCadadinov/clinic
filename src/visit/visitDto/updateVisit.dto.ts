// update-visit.dto.ts
import { IsOptional, IsEnum, IsInt, IsNumber, IsString, IsDateString, MaxLength } from 'class-validator';
import { VisitState } from '../visit.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class UpdateVisitDto {
  @ApiProperty()
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  clientId?: number;

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

  @IsInt()
    @IsOptional() // потому что в БД default: 0
    @Type(() => Number)
    is_emergency?: number;
  
    @IsString()
    @MaxLength(255)
    @IsOptional() // потому что nullable
    emergency_car?: string;

}
