import { Controller, Post, Body, Get, Delete, Param, Query, Patch, UseGuards, Req, ParseIntPipe } from '@nestjs/common';
import { ClientGroupService } from './client_group.service';
import { DTOClientGroup } from './client_group.dto/client_group.dto';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';
import { UpdateClientGroupDto } from './client_group.dto/updateClient_group.dto';
import { RolesGuard } from '../guard/roles.guard';
import { ClientGroupFilterDto } from './client_group.dto/clientDroupFilterDto'


@Controller('client-group')
export class ClientGroupController {
  constructor(private readonly clientGroupService: ClientGroupService) {}

  @Post('/add-client-group')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async addClientGroup(@Body() dto: DTOClientGroup, @Req() req: Request) {
    const user = (req as any).user.userId ;
    return await this.clientGroupService.addClientGroup(dto, user);
  }

  @Get('/all-client-groups')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getAllClientGroups(@Query() dto: ClientGroupFilterDto) {
    return await this.clientGroupService.getAllClientGroups(dto);
  }

  @Patch('update_client-group/:id')
  @UseGuards(JwtAuthGuard, RolesGuard) 
  async updateClientGroup(@Param('id', ParseIntPipe) id: string, @Body() dto: UpdateClientGroupDto, @Req() req: Request) {
    const user = (req as any).user.userId;
    return await this.clientGroupService.updateClientGroup(id, dto, user);
  }

  @Delete('delete_clientGroup/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async deleteClientGroup(@Param('id', ParseIntPipe) id: string) {
    //console.log(id);
    return await this.clientGroupService.deleteClientGroup(id);
  }
}
