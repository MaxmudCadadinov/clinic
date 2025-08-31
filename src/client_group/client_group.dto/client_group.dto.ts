import { IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';



export class DTOClientGroup {
    @ApiProperty()
    @IsString()
    name: string;

}