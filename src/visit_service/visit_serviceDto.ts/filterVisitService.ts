import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsNumber } from 'class-validator';
import { PaginationDto } from 'src/paginationDTO';



export class FilterVisitServiceDto extends PaginationDto{
  @ApiPropertyOptional({ example: 1, description: 'Фильтр по ID доктора' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  doctor_id?: number;

  @ApiPropertyOptional({ example: 5, description: 'Фильтр по ID услуги' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  service_id?: number;

  @ApiPropertyOptional({ example: 10, description: 'Фильтр по ID визита' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  visit_id?: number;

  @ApiPropertyOptional({ example: 3, description: 'Фильтр по ID отделения' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  departament_id?: number;
}
