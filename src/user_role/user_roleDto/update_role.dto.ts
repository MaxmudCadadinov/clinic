
import { IsOptional, IsString,  IsNumber,  Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';



export class UpdateRoleDto {

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Length(1, 255)
  name?: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  status?: number;
}