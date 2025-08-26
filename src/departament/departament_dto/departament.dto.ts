import { IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class DTODepartament{
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
   @IsNumber()
   owner_id: number;



}