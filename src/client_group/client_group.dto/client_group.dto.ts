import { IsString, IsNumber } from 'class-validator';



export class DTOClientGroup {
    @IsString()
    name: string;

}