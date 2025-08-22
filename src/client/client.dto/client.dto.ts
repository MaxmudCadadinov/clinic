import { IsString, IsNumber, IsNotEmpty, IsEnum, IsDateString } from 'class-validator';
import { clientType } from '../client.entity/client.entity';



export class ClientDto{
    @IsString()
    name: string;

    @IsString()
    phone: string;

    @IsNotEmpty()
    @IsEnum(clientType, {message: 'gender must be either MALE or FEMALE'})
    gender: string;

    @IsDateString() 
    birthday: string;

    @IsString()
    address: string;

}

