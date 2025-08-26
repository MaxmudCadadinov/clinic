import { Controller, Post, Body, Get, Delete, Param, Patch, Req } from '@nestjs/common';
import { ServiceUserService } from './service_user.service';
import { DTOServiceUSer } from './serviceUser.dto/serviceUser.dto';
import { UpdateUserServiceDto } from './serviceUser.dto/update_service_user.dto';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';
import { RolesGuard } from 'src/guard/roles.guard';
import { UseGuards } from '@nestjs/common';



@Controller('service-user')
export class ServiceUserController {
  constructor(private readonly serviceUserService: ServiceUserService) {}


  @Post('/add_userService')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async addServiceUser(@Body() dto: DTOServiceUSer, @Req() req: Request) {
    const registered_user = (req as any).user.userId
    return await this.serviceUserService.addServiceUser(dto, registered_user);
  }

  @Get('/all_usersService')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getAllServiceUsers() {
    return await this.serviceUserService.getAllServiceUsers();
  }

  @Patch('update_service_user/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async updateServiceUser(@Param('id') id: string, @Body() dto: UpdateUserServiceDto, @Req() req: Request) {
    const user = (req as any).user.userId
    return await this.serviceUserService.updateServiceUser(id, dto, user);
  }

  @Delete('delete_userService/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async deleteServiceUser(@Param('id') id: string) {
    return await this.serviceUserService.deleteServiceUser(id);
  }
}


