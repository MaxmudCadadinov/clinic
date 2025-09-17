// filter-visit.dto.ts
import { IsOptional, IsEnum, IsInt, IsNumber, IsString, IsDateString, MaxLength } from 'class-validator';
import { VisitState } from '../visit.entity';
import { PaginationDto } from 'src/paginationDTO';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer'



export class FilterVisitDto extends PaginationDto{
  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  clientId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  fromDate?: string; // начало периода (например: "2025-09-01T00:00:00")

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  toDate?: string; // конец периода

  @ApiPropertyOptional()
  @IsOptional()
  @IsEnum(VisitState)
  state?: VisitState;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  minPrice?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  maxPrice?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  status?: number;

  @ApiPropertyOptional({example:'2025-09-12'})
  @IsOptional()
  @IsDateString()
  created_from?: string; // фильтр: с какой даты создано

  @ApiPropertyOptional({example:'2025-09-12'})
  @IsOptional()
  @IsDateString()
  created_to?: string;   // фильтр: по какую дату создано

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  departament_id: number

  @IsInt()
    @IsOptional() // потому что в БД default: 0
    @Type(() => Number)
    is_emergency?: number;
  
    @IsString()
    @MaxLength(255)
    @IsOptional() // потому что nullable
    emergency_car?: string;

}
