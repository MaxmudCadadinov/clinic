import { Controller, Post, Body, Param, Delete, Get } from '@nestjs/common';
import { ServiceService } from './service.service';
import { DTODepartament } from './serviсe.dto/serviceDTO'


@Controller('service')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Post('/add_service')
  async add_departament(@Body() dto: DTODepartament) {
    return await this.serviceService.add_departament(dto);
  }

  @Get('all_users')
    async get_user() {
      return await this.serviceService.get_all_user();
    }
  
    @Delete(':id')
    async delete_user(@Param('id') id: string) {
      console.log(id);
      return await this.serviceService.delete_user(id);
    }

}