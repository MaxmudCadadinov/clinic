import { IsOptional, IsInt, IsEnum, IsNumber, IsDateString } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { ServiceType } from '../service_user.entity/service_user.entity';
import { PaginationDto } from 'src/paginationDTO';

export class ServiceUserFilterDto extends PaginationDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  user_id?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  service_id?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  register_id?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  modify_id?: number;

  @IsOptional()
  @IsInt()
  status?: number;

  @IsOptional()
  @IsEnum(ServiceType)
  type?: ServiceType;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  value?: number;

  // фильтр по дате создания
  @IsOptional()
  @IsDateString()
  created_from?: string;

  @IsOptional()
  @IsDateString()
  created_to?: string;
}
