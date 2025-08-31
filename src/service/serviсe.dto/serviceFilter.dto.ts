import { IsOptional, IsString, IsNumber, IsEnum, IsDateString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationDto } from '../../paginationDTO'

export class FilterServiceDTO extends PaginationDto{

@ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string  
  
@ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  price_min?: number; // диапазон баланса

@ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  price_max?: number;

@ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  departament_id?: number;

@ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
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