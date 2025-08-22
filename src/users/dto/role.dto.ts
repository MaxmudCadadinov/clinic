import { IsString, IsNumber, IsBoolean } from 'class-validator';

export class RoleUser{

    @IsString()
    name: string;
  
}