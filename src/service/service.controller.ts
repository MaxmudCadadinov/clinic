import { Controller, Post, Body, Param, Delete, Get, Patch, Req} from '@nestjs/common';
import { ServiceService } from './service.service';
import { DTOService } from './serviсe.dto/serviceDTO'
import { UpdateServiceDto } from './serviсe.dto/update_service.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';
import { RolesGuard } from 'src/guard/roles.guard';


@Controller('service')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Post('/add_service')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async add_departament(@Body() dto: DTOService, @Req() req: Request) {
    const registered_user = (req as any).user.userId
    return await this.serviceService.add_service(dto, registered_user);
  }

  @Get('all_services')
  @UseGuards(JwtAuthGuard, RolesGuard)
    async get_allServices() {
      return await this.serviceService.get_all_services();
    }

  @Patch('update_service/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
    async update_service(@Param('id') id: string, @Body() dto: UpdateServiceDto, @Req() req: Request){
      const updated_user_id = (req as any).user.userId
      return await this.serviceService.update_service(id, dto, updated_user_id);
    }
  
    @Delete('delete_service/:id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    async delete_service(@Param('id') id: string) {
      console.log(id);
      return await this.serviceService.delete_service(id);
    }

}