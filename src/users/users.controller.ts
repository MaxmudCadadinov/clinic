import { Controller, Post, Query, Body, Get, Param, Delete, Patch, Req, ParseIntPipe, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UsersService } from './users.service';
import { AddUser } from './dto/add_user.dto';
import { LoginUser } from './dto/login_user.dto';
import { RoleUser } from '../user_role/user_roleDto/role.dto';
import { RefreshDto } from './dto/refresh.dto';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { Roles } from '../guard/roles.decorator';
import { RolesGuard } from '../guard/roles.guard';
import { UpdateUserDto } from './dto/update_user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerUserConfig } from './multer.config'
import { UserFilterDto } from './dto/userFilterDTO'


@ApiTags('users') 
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
//
  @ApiBearerAuth()
  @Post('/add_user')
  @UseInterceptors(FileInterceptor('photo', multerUserConfig))
  @UseGuards(JwtAuthGuard, RolesGuard)
  async add_user(@Body() dto: AddUser, @UploadedFile() file?: Express.Multer.File,){

    if(file){dto.photo = file.path;}
    return await this.usersService.add_user(dto);
  }

  @Get('all_users')
  @UseGuards(JwtAuthGuard)
  async get_user(@Query() dto: UserFilterDto) {
    return await this.usersService.get_all_user(dto);
  }

  @Patch('update_user/:id')
  @UseGuards(JwtAuthGuard)
  async update_user(@Param('id',ParseIntPipe) id: string, @Query() dto: UpdateUserDto, ) {
    return await this.usersService.update_user(id, dto);
  }

  @Delete('delete_user/:id')
  @UseGuards(JwtAuthGuard)
  async delete_user(@Param('id',ParseIntPipe) id: string) {
    console.log(id);
    return await this.usersService.delete_user(id);
  }

  //

  @Post('/login_user')
  async login_user(@Body() dto: LoginUser) {
    return await this.usersService.login_user(dto);
  }
  
  @Post('/refresh')
  async refresh(@Body() dto: RefreshDto){
    return await this.usersService.refresh_token(dto)
  }

  @Get('/logout/:id')
  @UseGuards(JwtAuthGuard)
  async logout(@Param('id',ParseIntPipe) id: string){
    return await this.usersService.logout(id)
  }
}




