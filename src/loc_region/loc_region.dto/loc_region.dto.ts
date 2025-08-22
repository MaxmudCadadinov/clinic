import { IsString, IsNumber } from 'class-validator';



export class DTOlocRegion {
    @IsString()
    name: string;

}