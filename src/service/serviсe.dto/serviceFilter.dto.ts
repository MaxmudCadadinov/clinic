import { IsOptional, IsString, IsNumber, IsEnum, IsDateString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationDto } from '../../paginationDTO'
import { Type } from 'class-transformer'


export class FilterServiceDTO extends PaginationDto{

@ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string  
  
@ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  price_min?: number; // диапазон баланса

@ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  price_max?: number;

@ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  departament_id?: number;

@ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  status?: number;

@ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  created_from?: string;

@ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  created_to?: string;  
}