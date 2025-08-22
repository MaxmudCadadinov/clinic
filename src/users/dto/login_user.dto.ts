import { IsString } from 'class-validator';

export class LoginUser{
    @IsString()
    userName: string;

    @IsString()
    password: string;
}