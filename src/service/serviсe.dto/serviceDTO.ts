import { IsString, IsNumber } from 'class-validator';
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


}