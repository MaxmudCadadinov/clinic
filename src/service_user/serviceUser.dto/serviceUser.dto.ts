import { IsNumber, IsEnum } from 'class-validator';
import { ServiceType } from '../service_user.entity/service_user.entity';
import { ApiProperty } from '@nestjs/swagger';


export class DTOServiceUSer{

    @ApiProperty()
    @IsNumber()
    user_id: number;

    @ApiProperty()
   @IsNumber()
   service_id: number;

   @ApiProperty()
   @IsEnum(ServiceType)
   type: ServiceType;

   @ApiProperty()
   @IsNumber()
    value: number;

}

