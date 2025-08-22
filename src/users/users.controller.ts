import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { AddUser } from './dto/add_user.dto';
import { LoginUser } from './dto/login_user.dto';
import { RoleUser } from './dto/role.dto';
import { RefreshDto } from './dto/refresh.dto';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { Roles } from '../guard/roles.decorator';
import { RolesGuard } from '../guard/roles.guard';



@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
//
  @Post('/add_user')
  @UseGuards(JwtAuthGuard, RolesGuard)
  //@Roles(1) // Только администратор может добавлять пользователей
  async add_user(@Body() dto: AddUser){
    return await this.usersService.add_user(dto);
  }
  @Get('all_users')
  
  @UseGuards(JwtAuthGuard)
  async get_user() {
    return await this.usersService.get_all_user();
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete_user(@Param('id') id: string) {
    console.log(id);
    return await this.usersService.delete_user(id);
  }

  //



  @Post('/login_user')
  async login_user(@Body() dto: LoginUser) {
    return await this.usersService.login_user(dto);
  }
  //
  @Post('/add_role')
  async add_role(@Body() dto: RoleUser) {
  return await this.usersService.add_role(dto)
  }

  @Get('all_roles')
  async get_roles() {
    return await this.usersService.get_roles();
  }

  @Delete(':id')
  async delete_role(@Param('id') id: string) {
    console.log(id);
    return await this.usersService.delete_user(id);
  }

  // @Post('/refresh_token')
  // async refresh(@Body() dto: RefreshDto) {
  //   return await this.usersService.refresh_token(dto.refresh);
  // }

}


