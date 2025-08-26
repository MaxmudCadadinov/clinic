import { IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class DTOlocRegion {
    @ApiProperty()
    @IsString()
    name: string;

}