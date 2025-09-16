import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsInt, IsEnum, IsNumber } from 'class-validator';

export class CreateRoomDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  departament_id?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  capacity?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  count_patient?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  user_id?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  price?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  price_food?: number;

  @ApiPropertyOptional({ enum: ['WORKING', 'CLOSED', 'FULL'] })
  @IsOptional()
  @IsEnum(['WORKING', 'CLOSED', 'FULL'])
  state?: 'WORKING' | 'CLOSED' | 'FULL';

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  status?: number;
}
