import { IsOptional, IsString, IsInt, IsDateString, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { PaginationDto } from 'src/paginationDTO';


export class ClientGroupFilterDto extends PaginationDto{

  @IsOptional()
  @IsString()
  name?: string; // поиск по LIKE

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  status?: number;

  @IsOptional()
  @IsDateString()
  created_from?: string;

  @IsOptional()
  @IsDateString()
  created_to?: string;

}
