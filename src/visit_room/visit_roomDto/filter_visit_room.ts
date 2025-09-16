import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsInt, IsOptional, IsString, IsDateString, IsIn, IsNumber } from "class-validator";
import { Type } from "class-transformer";
import { PaginationDto } from "src/paginationDTO";

export class FilterVisitRoomDto  extends PaginationDto{
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

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  is_food_connected?: number

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  doctorId?: number;

  @ApiPropertyOptional({ example: "CARD-12345", description: "Номер карты пациента (поиск по LIKE)" })
  @IsOptional()
  @IsString()
  card_number?: string;

  @ApiPropertyOptional({ example: 42, description: "ID карты" })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  card_id?: number;

  @ApiPropertyOptional({ example: "2025-09-12", description: "Дата начала (с)" })
  @IsOptional()
  @IsDateString()
  date_start_from?: Date;

  @ApiPropertyOptional({ example: "2025-09-20", description: "Дата начала (по)" })
  @IsOptional()
  @IsDateString()
  date_start_to?: Date;

  @ApiPropertyOptional({ example: "2025-09-15", description: "Дата окончания (с)" })
  @IsOptional()
  @IsDateString()
  date_end_from?: Date;

  @ApiPropertyOptional({ example: "2025-09-30", description: "Дата окончания (по)" })
  @IsOptional()
  @IsDateString()
  date_end_to?: Date;

  @ApiPropertyOptional({ example: "TREAT", enum: ["TREAT", "GONE"], description: "Состояние пациента" })
  @IsOptional()
  @IsIn(["TREAT", "GONE"])
  state?: "TREAT" | "GONE";

  @ApiPropertyOptional({ example: 1, description: "Статус (1 = активен, 0 = удалён)" })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  status?: number;

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

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  created_from?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  created_to?: string;
}
