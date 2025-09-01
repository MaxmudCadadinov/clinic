import { IsOptional, IsString, IsNumber, IsEnum, IsDateString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { clientType } from '../client.entity/client.entity'
import { PaginationDto } from '../../paginationDTO'
import { Type } from 'class-transformer';


export class ClientFilterDto extends PaginationDto{

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string; // можно использовать для LIKE поиска

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  group_id?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEnum(clientType)
  gender?: clientType;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  birthday_from?: string; // диапазон фильтрации по дате рождения

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  birthday_to?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  region_id?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  district_id?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  balance_min?: number; // диапазон баланса

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  balance_max?: number;


  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  source_id?: number;

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