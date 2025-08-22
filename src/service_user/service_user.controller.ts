import { Controller, Post, Body, Get, Delete, Param } from '@nestjs/common';
import { ServiceUserService } from './service_user.service';
import { DTOServiceUSer } from './serviceUser.dto/serviceUser.dto';

@Controller('service-user')
export class ServiceUserController {
  constructor(private readonly serviceUserService: ServiceUserService) {}


  @Post('/add_userService')
  async addServiceUser(@Body() dto: DTOServiceUSer) {
    return await this.serviceUserService.addServiceUser(dto);
  }

  @Get('/all_usersService')
  async getAllServiceUsers() {
    return await this.serviceUserService.getAllServiceUsers();
  }

  @Delete(':id')
  async deleteServiceUser(@Param('id') id: string) {
    console.log(id);
    return await this.serviceUserService.deleteServiceUser(id);
  }
}
