import { IsString, IsNumber } from 'class-validator';



export class AddUser{
    @IsString()
    name: string;

    @IsString()
    username: string;

    @IsString()
    password: string;

    @IsString()
    phone: string;

    @IsNumber()
    role_id: number;

    @IsString()
    chat_id: string;
}

