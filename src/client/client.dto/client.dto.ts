import { IsString, IsNumber, IsNotEmpty, IsEnum, IsDateString, IsOptional } from 'class-validator';
import { clientType } from '../client.entity/client.entity';
import { ApiProperty } from '@nestjs/swagger';


export class ClientDto{

    @ApiProperty()
    @IsString()
    name: string;
    @ApiProperty()
    @IsString()
    phone: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsEnum(clientType, {message: 'gender must be either MALE or FEMALE'})
    gender: clientType;

    @ApiProperty({example: '1995-08-27'})
    @IsDateString() 
    birthday: Date;

    @ApiProperty()
    @IsString()
    address: string;

    @ApiProperty()
    @IsString()
    description: string;

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    source_id: number;

    @ApiProperty()
    @IsNumber()
    group_id: number;

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    region_id: number;      

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    district_id: number;

    


    

}



