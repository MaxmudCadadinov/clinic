import { Controller, Post, Body, Get, Delete, Param } from '@nestjs/common';
import { ClientGroupService } from './client_group.service';
import { DTOClientGroup } from './client_group.dto/client_group.dto';

@Controller('client-group')
export class ClientGroupController {
  constructor(private readonly clientGroupService: ClientGroupService) {}

  @Post('/add-client-group')
  async addClientGroup(@Body() dto: DTOClientGroup) {
    return await this.clientGroupService.addClientGroup(dto);
  }

  @Get('/all-client-groups')
  async getAllClientGroups() {
    return await this.clientGroupService.getAllClientGroups();
  }

  @Delete(':id')
  async deleteClientGroup(@Param('id') id: string) {
    console.log(id);
    return await this.clientGroupService.deleteClientGroup(id);
  }
}
