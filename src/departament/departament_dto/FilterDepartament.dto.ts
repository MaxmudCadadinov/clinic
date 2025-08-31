import { IsOptional, IsString, IsNumber, IsEnum, IsDateString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationDto } from '../../paginationDTO'

export class FilterDepartamentDto extends PaginationDto{
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string 
  
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  owner_id?: number
  
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