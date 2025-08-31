import { IsString, IsInt, Min, Max, Length, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class UpdateClientGroupDto {

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Length(1, 255)
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  status?: number;

}