import { IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class DTOlocDistrict {
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsNumber()
    region_id: number;

}

