import { IsString, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

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
    @Type(() => Number)
    @IsNumber()
    role_id: number;

    @ApiProperty()
    @Type(() => Number)
    @IsNumber()
    chat_id: number;

    @ApiProperty()
    @IsOptional()
    @IsString()
    photo: string;
}



