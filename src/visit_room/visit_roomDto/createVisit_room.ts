import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsInt, IsOptional, IsString, IsDateString, IsIn } from "class-validator";
import { Type } from "class-transformer";

export class CreateVisitRoomDto {
  @ApiProperty({ example: 1, description: "ID комнаты (room_id)" })
  @IsInt()
  @Type(() => Number)
  roomId: number;

  @ApiProperty({ example: 1, description: "ID визита (visit_id)" })
  @IsInt()
  @Type(() => Number)
  visitId: number;

  @ApiProperty({ example: 1, description: "ID клиента (client_id)" })
  @IsInt()
  @Type(() => Number)
  clientId: number;

  @ApiPropertyOptional({ example: "CARD-12345", description: "Номер карты пациента" })
  @IsOptional()
  @IsString()
  card_number?: string;

  @ApiPropertyOptional({ example: 42, description: "ID карты" })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  card_id?: number;

  @ApiPropertyOptional({ example: "2025-09-12", description: "Дата начала лечения (YYYY-MM-DD)" })
  @IsOptional()
  @IsDateString()
  date_start?: string;

  @ApiPropertyOptional({ example: "2025-09-20", description: "Дата окончания лечения (YYYY-MM-DD)" })
  @IsOptional()
  @IsDateString()
  date_end?: string;

  @ApiPropertyOptional({ example: "TREAT", enum: ["TREAT", "GONE"], description: "Состояние пациента" })
  @IsOptional()
  @IsIn(["TREAT", "GONE"])
  state?: "TREAT" | "GONE";

  @ApiPropertyOptional({ example: 1, description: "Статус (1 = активен, 0 = удалён)" })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  status?: number;

  @ApiPropertyOptional({ example: 0, description: "Подключено питание (0 или 1)" })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  is_food_connected?: number;

  @ApiPropertyOptional({ example: 1000.50, description: "Цена лечения" })
  @IsOptional()
  @Type(() => Number)
  price?: number;

  @ApiPropertyOptional({ example: 1200.75, description: "Итоговая цена" })
  @IsOptional()
  @Type(() => Number)
  price_count?: number;

  @ApiPropertyOptional({ example: 2, description: "ID врача" })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  doctorId?: number;
}
