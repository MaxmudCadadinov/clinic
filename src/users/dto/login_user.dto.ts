import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUser{
    @ApiProperty()
    @IsString()
    userName: string;

    @ApiProperty()
    @IsString()
    password: string;
}