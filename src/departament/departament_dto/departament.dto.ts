import { IsString, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';


export class DTODepartament{
    @ApiPropertyOptional()
    @IsString()
    name: string;

    @ApiPropertyOptional()
   @IsNumber()
   owner_id: number;



}