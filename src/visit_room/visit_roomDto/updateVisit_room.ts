import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsInt, IsOptional, IsString, IsDateString, IsIn } from "class-validator";
import { Type } from "class-transformer";

export class UpdateVisitRoomDto {
  @ApiPropertyOptional({ example: 2, description: "ID комнаты (room_id)" })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  roomId?: number;

  @ApiPropertyOptional({ example: 10, description: "ID визита (visit_id)" })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  visitId?: number;

  @ApiPropertyOptional({ example: 5, description: "ID клиента (client_id)" })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  clientId?: number;

  @ApiPropertyOptional({ example: "CARD-12345", description: "Номер карты пациента" })
  @IsOptional()
  @IsString()
  card_number?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  is_food_connected?: number

  @ApiPropertyOptional({ example: 42, description: "ID карты" })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  card_id?: number;

  @ApiPropertyOptional({ example: "2025-09-12", description: "Дата начала лечения (YYYY-MM-DD)" })
  @IsOptional()
  @IsDateString()
  date_start?: Date;

  @ApiPropertyOptional({ example: "2025-09-20", description: "Дата окончания лечения (YYYY-MM-DD)" })
  @IsOptional()
  @IsDateString()
  date_end?: Date;

  @ApiPropertyOptional({ example: "TREAT", enum: ["TREAT", "GONE"], description: "Состояние пациента" })
  @IsOptional()
  @IsIn(["TREAT", "GONE"])
  state?: "TREAT" | "GONE";

  @ApiPropertyOptional({ example: 1, description: "Статус (1 = активен, 0 = удалён)" })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  status?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  doctorId: number

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  price: number

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  price_count: number
}
