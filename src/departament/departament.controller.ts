import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { DepartamentService } from './departament.service';
import { DTODepartament } from './departament_dto/departament.dto';

@Controller('departament')
export class DepartamentController {
  constructor(private readonly departamentService: DepartamentService) {}

  @Post('/add_departament')
  async add_departament(@Body() dto: DTODepartament) {
    return await this.departamentService.add_departament(dto);
  }
  
  @Get('all_departaments')
  async get_departaments() {
    return await this.departamentService.get_all_departaments();
  }

  @Delete(':id')
  async delete_departament(@Param('id') id: string) {
    return await this.departamentService.delete_departament(id);
  }

}
