import { IsOptional, IsString, IsNumber, IsInt, Min, Max, Length, IsNotEmpty, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class UpdateServiceDto  {

    @ApiProperty()
    @IsOptional()
    @IsString()
    @Length(1, 255)
    name?: string;

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    price: number;

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    departament_id: number

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    status: number
    
}