import { IsString, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class DTOService{
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
   @IsNumber()
   price: number;

   @ApiProperty()
   @IsNumber()
   departament_id: number;

   @ApiProperty()
   @IsOptional()
   @IsNumber()
   has_file: number;


}