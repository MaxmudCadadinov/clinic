import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsNumber } from 'class-validator';
import { PaginationDto } from 'src/paginationDTO';



export class FilterVisitServiceDto extends PaginationDto{
  @ApiPropertyOptional({ example: 1, description: 'Фильтр по ID доктора' })
  @IsOptional()
  @IsNumber()
  doctor_id?: number;

  @ApiPropertyOptional({ example: 5, description: 'Фильтр по ID услуги' })
  @IsOptional()
  @IsNumber()
  service_id?: number;

  @ApiPropertyOptional({ example: 10, description: 'Фильтр по ID визита' })
  @IsOptional()
  @IsNumber()
  visit_id?: number;

  @ApiPropertyOptional({ example: 3, description: 'Фильтр по ID отделения' })
  @IsOptional()
  @IsNumber()
  departament_id?: number;
}
