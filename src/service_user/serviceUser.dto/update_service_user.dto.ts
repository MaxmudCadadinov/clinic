import { IsOptional, IsString, IsNumber, IsInt, Min, Max, Length, IsNotEmpty, IsBoolean, IsEnum } from 'class-validator';
import { ServiceType } from '../service_user.entity/service_user.entity'
import { ApiProperty } from '@nestjs/swagger';


export class UpdateUserServiceDto  {
    @ApiProperty()
    @IsOptional()
    @IsNumber()
    user_id: number;

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    service_id?: number;

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    status: number

    @ApiProperty()
    @IsOptional()
    @IsEnum(ServiceType, { message: 'type must be FIXED or PERCENT' })
    type: ServiceType

    @ApiProperty()
    @IsOptional()
    @IsNumber({}, { message: 'value must be a number' })
    value: number;


    
}