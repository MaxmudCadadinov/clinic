import { IsOptional, IsString, IsInt, Min, Max, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class Updateloc_districtDto {
    @ApiProperty()
    @IsOptional()
    @IsString()
    @Length(1, 255)
    name?: string;

    @ApiProperty()
    @IsOptional()
    @IsInt()
    @Min(0)
    @Max(10)
    status?: number;

    @ApiProperty()
    @IsOptional()
    @IsInt()
    @Min(1)
    region_id?: number;
}

