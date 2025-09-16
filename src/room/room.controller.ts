import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { RoomService } from './room.service';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';
import { RolesGuard } from 'src/guard/roles.guard';
import { CreateRoomDto } from './roomDto.ts/createRoom';
import { FilterRoomDto } from './roomDto.ts/filterRoom';
import { UpdateRoomDto } from './roomDto.ts/updateRoom';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}


  @Post('/add_room')
    @UseGuards(JwtAuthGuard, RolesGuard)
    //@Roles(3)
    async add_departament(@Body() dto: CreateRoomDto, @Req() req: Request) {
      const user = (req as any).user.userId ;
      //console.log(user)
      return await this.roomService.add_room(dto, user);
    }
    
    @Get('all_room')
    @UseGuards(JwtAuthGuard, RolesGuard)
    async get_departaments(@Query() dto: FilterRoomDto) {
      return await this.roomService.get_all_rooms(dto);
    }
  
    @Patch('update_room/:id')
    @UseGuards(JwtAuthGuard)
    async update_departament(@Param('id', ParseIntPipe) id: string, @Body() dto: UpdateRoomDto, @Req() req: Request) {
      const user = (req as any).user.userId ;
      return await this.roomService.update_room(id, dto, user);
    }
  
  
    @Delete('delete_room/:id')
    @UseGuards(JwtAuthGuard)
    async delete_departament(@Param('id', ParseIntPipe) id: string) {
      return await this.roomService.delete_room(id);
    }
}
