import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsInt, IsNumber, Min } from "class-validator";
import { Type } from "class-transformer";
import { PaginationDto } from "src/paginationDTO";

export class FilterVisitReferalDto extends PaginationDto{
  @ApiPropertyOptional({ example: 12, description: "ID визита" })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  visitId?: number;

  @ApiPropertyOptional({ example: 5, description: "ID реферала" })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  referalId?: number;

  @ApiPropertyOptional({ example: 3, description: "ID услуги" })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  serviceId?: number;

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

  @ApiPropertyOptional({ example: "2025-09-01", description: "Дата создания от" })
  @IsOptional()
  @Type(() => Date)
  created_from?: Date;

  @ApiPropertyOptional({ example: "2025-09-12", description: "Дата создания до" })
  @IsOptional()
  @Type(() => Date)
  created_to?: Date;

  @ApiPropertyOptional({ example: 1, description: "Статус (1 = активный, 0 = удалён)" })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  status?: number;


}
