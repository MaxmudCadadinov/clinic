import { IsString, IsNumber } from 'class-validator';



export class DTODepartament{
    @IsString()
    name: string;

   @IsNumber()
   price: number;

   @IsNumber()
   departament_id: number;

   @IsNumber()
   register_id: number;

}