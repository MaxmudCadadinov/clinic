import { IsString, IsNumber } from 'class-validator';



export class DTOlocDistrict {
    @IsString()
    name: string;

    region_id: number;

}