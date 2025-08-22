import { IsString, IsNumber } from 'class-validator';



export class DTOClientGroup {
    @IsString()
    name: string;

   @IsNumber()
   register_id: number;

}