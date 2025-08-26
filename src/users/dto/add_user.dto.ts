import { IsString, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class AddUser{
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsString()
    username: string;

    @ApiProperty()
    @IsString()
    password: string;

    @ApiProperty()
    @IsString()
    phone: string;

    @ApiProperty()
    @IsNumber()
    role_id: number;

    @ApiProperty()
    @IsNumber()
    chat_id: number;

    @ApiProperty()
    @IsOptional()
    @IsString()
    photo: string;
}



