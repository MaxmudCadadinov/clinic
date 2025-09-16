import { IsOptional, IsString, IsNumber, IsEnum, IsDateString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger'
import { PaginationDto } from '../../paginationDTO'
import { Type } from 'class-transformer';

export class UserFilterDto extends PaginationDto{

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;
  
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  user_name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  phone?: string

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  role_id?: number

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