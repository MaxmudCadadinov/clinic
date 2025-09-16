import { IsOptional, IsString, IsInt, Min, Max, IsDate } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationDto } from 'src/paginationDTO';

export class FilterReferalDto extends PaginationDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(100)
  percent?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  status?: number;

  @ApiPropertyOptional({example:'2025-09-12'})
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  createdFrom?: Date;

  @ApiPropertyOptional({example:'2025-09-12'})
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  createdTo?: Date;

}
