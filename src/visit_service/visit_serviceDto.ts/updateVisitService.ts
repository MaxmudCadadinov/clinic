import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsNumber } from 'class-validator';

export class UpdateVisitServiceDto {
  @ApiPropertyOptional({ example: 1, description: 'ID доктора' })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  doctor_id?: number;

  @ApiPropertyOptional({ example: 5, description: 'ID услуги' })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  service_id?: number;

  @ApiPropertyOptional({ example: 10, description: 'ID визита' })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  visit_id?: number;

  @ApiPropertyOptional({ example: 3, description: 'ID отделения (departament)' })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  departament_id?: number;
}
