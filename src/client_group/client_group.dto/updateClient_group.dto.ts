import { IsString, IsInt, Min, Max, Length, IsOptional } from 'class-validator';

export class UpdateClientGroupDto {

  @IsOptional()
  @IsString()
  @Length(1, 255)
  name: string;

  @IsOptional()
  @IsInt()
  status?: number;

}