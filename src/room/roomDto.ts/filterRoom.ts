import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsInt, IsEnum, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { PaginationDto } from 'src/paginationDTO';



export class FilterRoomDto extends PaginationDto{
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  departament_id?: number | null

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  capacity?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  user_id?: number;

  @ApiPropertyOptional({ enum: ['WORKING', 'CLOSED', 'FULL'] })
  @IsOptional()
  @IsEnum(['WORKING', 'CLOSED', 'FULL'])
  state?: 'WORKING' | 'CLOSED' | 'FULL';

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  status?: number;

  @ApiPropertyOptional({ description: 'Дата создания от', type: String, example: '2025-09-13' })
  @IsOptional()
  @Type(() => Date)
  created_from?: Date;

  @ApiPropertyOptional({ description: 'Дата создания до', type: String, example: '2025-09-15' })
  @IsOptional()
  @Type(() => Date)
  created_to?: Date;

  @ApiPropertyOptional({ example: 1000, description: "Минимальная цена" })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  minPrice?: number;

  @ApiPropertyOptional({ example: 2000, description: "Максимальная цена" })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  maxPrice?: number;


}
