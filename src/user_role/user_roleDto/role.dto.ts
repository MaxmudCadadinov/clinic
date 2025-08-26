import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';


export class RoleUser{
    @ApiProperty()
    @IsString()
    name: string;
  
}