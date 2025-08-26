import { IsString, IsInt, Min, Max, Length, IsOptional, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class UpdateRegionDto {

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(10)
  status?: number;
}


