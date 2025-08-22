import { IsString, IsNumber } from 'class-validator';



export class DTODepartament{
    @IsString()
    name: string;

   @IsNumber()
   owner_id: number;

   @IsNumber()
   register_id: number;

}