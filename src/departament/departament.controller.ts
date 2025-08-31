import { Controller, Post, Body, Get, Param, Delete, Patch, Req, ParseIntPipe, Query} from '@nestjs/common';
import { DepartamentService } from './departament.service';
import { DTODepartament } from './departament_dto/departament.dto';
import { UpdateDeportamentDto } from './departament_dto/update_departament.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';
import { RolesGuard } from 'src/guard/roles.guard';
import { Roles } from '../guard/roles.decorator'
import { FilterDepartamentDto } from './departament_dto/FilterDepartament.dto'

@Controller('departament')
export class DepartamentController {
  constructor(private readonly departamentService: DepartamentService) {}

  @Post('/add_departament')
  @UseGuards(JwtAuthGuard, RolesGuard)
  //@Roles(3)
  async add_departament(@Body() dto: DTODepartament, @Req() req: Request) {
    const user = (req as any).user.userId ;
    //console.log(user)
    return await this.departamentService.add_departament(dto, user);
  }
  
  @Get('all_departaments')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async get_departaments(@Query() dto: FilterDepartamentDto) {
    return await this.departamentService.get_all_departaments(dto);
  }

  @Patch('update_departament/:id')
  @UseGuards(JwtAuthGuard)
  async update_departament(@Param('id', ParseIntPipe) id: string, @Body() dto: UpdateDeportamentDto, @Req() req: Request) {
    const user = (req as any).user.userId ;
    return await this.departamentService.update_departament(id, dto, user);
  }


  @Delete('delete_departament/:id')
  @UseGuards(JwtAuthGuard)
  async delete_departament(@Param('id', ParseIntPipe) id: string) {
    return await this.departamentService.delete_departament(id);
  }

}
