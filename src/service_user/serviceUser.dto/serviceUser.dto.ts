import { IsNumber, IsEnum } from 'class-validator';
import { ServiceType } from '../service_user.entity/service_user.entity';



export class DTOServiceUSer{

    @IsNumber()
    user_id: number;

   @IsNumber()
   service_id: number;

   @IsNumber()
   register_id: number;

   @IsEnum(ServiceType)
   type: ServiceType;

   @IsNumber()
    value: number;

}