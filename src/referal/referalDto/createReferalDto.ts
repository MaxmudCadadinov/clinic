import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsInt, Min, Max, IsPhoneNumber } from 'class-validator';

export class CreateReferalDto {
  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

   @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty({ message: 'Phone is required' })
  // Если номера строго в формате, можно указать конкретную страну, например 'UZ'
  // @IsPhoneNumber('UZ')
  phone: string;

   @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

   @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(100)
  percent?: number;

   @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  status?: number;
}
