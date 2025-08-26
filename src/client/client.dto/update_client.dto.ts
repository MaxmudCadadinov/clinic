import { IsOptional, IsString, IsInt, IsNumber, IsEnum, Min, Max, Length, IsDateString } from 'class-validator';
import { clientType } from '../client.entity/client.entity';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';


export class UpdateClientDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  @Length(1, 255)
  name?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Length(1, 255)
  phone?: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(clientType)
  gender?: clientType;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  @Min(1)
  group_id?: number;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  birthday?: string;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  @Min(1)
  region_id?: number;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  @Min(1)
  district_id?: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Length(0, 255)
  address?: string;

//   @IsOptional()
//   @IsNumber()
//   @Min(0)
//   @Type(() => Number)
//   balance?: number;

@ApiProperty()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  @Min(1)
  source_id?: number;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(10)
  status?: number;

}
