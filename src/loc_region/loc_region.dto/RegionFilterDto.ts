import { IsOptional, IsString, IsNumber, IsDateString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { PaginationDto } from '../../paginationDTO';

export class LocRegionFilterDto extends PaginationDto{

@ApiPropertyOptional({ description: 'Название района (LIKE)' })
@IsOptional()
@IsString()
name?: string;

@ApiPropertyOptional({ description: 'Статус района' })
@IsOptional()
@Type(() => Number)
@IsNumber()
status?: number;

@ApiPropertyOptional({ description: 'Дата создания от' })
@IsOptional()
@IsDateString()
created_from?: string;

@ApiPropertyOptional({ description: 'Дата создания до' })
@IsOptional()
@IsDateString()
created_to?: string;

}