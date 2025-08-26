import { IsString, IsInt, Min, Max, Length, IsOptional, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateSourceDto {

      @ApiProperty()
      @IsOptional()
      @IsString()
      @Length(1, 255)
      name: string;
    
      @ApiProperty()
      @IsOptional()
      @IsInt()
      @Min(0)
      @Max(11)
      status: number;
}



