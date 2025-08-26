import { Controller, Post, Patch, Delete, Get, Body, Param } from '@nestjs/common';
import { UserRoleService } from './user_role.service';
import { RoleUser } from './user_roleDto/role.dto'
import { JwtAuthGuard } from '../guard/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { UpdateRoleDto } from './user_roleDto/update_role.dto'



@Controller('user-role')
export class UserRoleController {
  constructor(private readonly userRoleService: UserRoleService) {}

@Post('/add_role')
  @UseGuards(JwtAuthGuard)
  async add_role(@Body() dto: RoleUser) {
  return await this.userRoleService.add_role(dto)
  }

  @Get('all_roles')
    @UseGuards(JwtAuthGuard)
    async get_roles() {
      return await this.userRoleService.get_roles();
    }

  @Patch('update_role/:id')
  @UseGuards(JwtAuthGuard)
  async update_role(@Param('id') id: string, @Body() dto: UpdateRoleDto) {
    return await this.userRoleService.update_role(id, dto);
  }

   @Delete('delete_role/:id')
  @UseGuards(JwtAuthGuard)
  async delete_role(@Param('id') id: string) {
    console.log(id);
    return await this.userRoleService.delete_role(id);
  }
}
