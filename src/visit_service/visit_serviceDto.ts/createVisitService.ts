import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsNumber } from 'class-validator';

export class CreateVisitServiceDto {
  @ApiPropertyOptional({ example: 1, description: 'ID доктора' })
  @IsOptional()
  @IsNumber()
  doctor_id?: number;

  @ApiPropertyOptional({ example: 5, description: 'ID услуги' })
  @IsOptional()
  @IsNumber()
  service_id?: number;

  @ApiPropertyOptional({ example: 10, description: 'ID визита' })
  @IsOptional()
  @IsNumber()
  visit_id?: number;

  @ApiPropertyOptional({ example: 3, description: 'ID отделения (departament)' })
  @IsOptional()
  @IsNumber()
  departament_id?: number;
}
