import { Controller, Post, Body, Get, Patch, Delete, Param, Req, ParseIntPipe, Query } from '@nestjs/common';
import { ClientService } from './client.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';
import { RolesGuard } from '../guard/roles.guard';
import { ClientDto } from './client.dto/client.dto';
import { UpdateClientDto } from './client.dto/update_client.dto';
import { ClientFilterDto } from './client.dto/filter_client.dto'

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

@Post('/add_client')
@UseGuards(JwtAuthGuard)
  async add_client(@Body() dto: ClientDto, @Req() req: Request){
    const user = (req as any).user.userId
    return await this.clientService.add_client(dto, user);
  }

@Get ('all_clients')
@UseGuards(JwtAuthGuard)
  async get_clients(@Query() dto: ClientFilterDto){
      return await this.clientService.get_all_clients(dto);
  }

@Patch('update/:id')
@UseGuards(JwtAuthGuard)
async update_client(@Param('id', ParseIntPipe) id: string, @Body() dto: UpdateClientDto, @Req() req: Request) {
  const user = (req as any).user.userId 
  return await this.clientService.update_client(id, dto, user);
}

@Delete('delete/:id')
@UseGuards(JwtAuthGuard)
async delete_client(@Param('id', ParseIntPipe) id: string) {
  return await this.clientService.delete_client(id);
}
}
