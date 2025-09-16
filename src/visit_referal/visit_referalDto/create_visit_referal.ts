import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsInt, IsNumber, IsOptional, Min } from "class-validator";

export class CreateVisitReferalDto {
  @ApiPropertyOptional({ example: 12, description: "ID визита" })
  @IsInt()
  visitId: number;

  @ApiPropertyOptional({ example: 5, description: "ID реферала" })
  @IsInt()
  referalId: number;

  @ApiPropertyOptional({ example: 3, description: "ID услуги" })
  @IsInt()
  serviceId: number;

  @ApiPropertyOptional({ example: 150000.0, description: "Цена услуги" })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  price?: number;

  @ApiPropertyOptional({ example: 50000.0, description: "Цена для реферала" })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  price_referal?: number;

  @ApiPropertyOptional({ example: 1, description: "Статус (1 = активный, 0 = удалён)" })
  @IsOptional()
  @IsInt()
  status?: number;




}
