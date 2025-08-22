import { IsString, IsNumber } from 'class-validator';



export class DTOSource {
    @IsString()
    name: string;

}