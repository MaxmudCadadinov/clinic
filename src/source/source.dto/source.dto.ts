import { IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class DTOSource {
    @ApiProperty()
    @IsString()
    name: string;

}