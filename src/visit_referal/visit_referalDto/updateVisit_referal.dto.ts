import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsInt, IsNumber } from "class-validator";
import { Type } from "class-transformer";

export class UpdateVisitReferalDto {
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

  @ApiPropertyOptional({ example: 1500.50, description: "Цена" })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  price?: number;

  @ApiPropertyOptional({ example: 500.25, description: "Цена реферала" })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  price_referal?: number;

  @ApiPropertyOptional({ example: 1, description: "Статус (1 = активный, 0 = удалён)" })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  status?: number;
}
