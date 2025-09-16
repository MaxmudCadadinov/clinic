import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { VisitRoomService } from './visit_room.service';
import { CreateVisitRoomDto } from './visit_roomDto/createVisit_room';
import { UpdateVisitRoomDto } from './visit_roomDto/updateVisit_room';
import { FilterVisitRoomDto } from './visit_roomDto/filter_visit_room';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';
import { RolesGuard } from 'src/guard/roles.guard';






@Controller('visit-room')
export class VisitRoomController {
    constructor(private readonly visit_roomService: VisitRoomService){}

    @Post('/addVisit_room')
    @UseGuards(JwtAuthGuard, RolesGuard)
    async add_v_r(@Body() dto: CreateVisitRoomDto, @Req() req: Request){
        const user = (req as any).user.userId 
        return await this.visit_roomService.addVisit_room(dto, user)
    }

    @Get('/allVisitRooms')
    @UseGuards(JwtAuthGuard, RolesGuard)
    async all_VisitReferals(@Query() dto: FilterVisitRoomDto){
        return await this.visit_roomService.all_VisitRooms(dto)
    }

    @Patch('/update_VisitRoom/:id')
    @UseGuards(JwtAuthGuard)
    async update_VisitReferals(@Param('id', ParseIntPipe) id: string, @Body() dto: UpdateVisitRoomDto, @Req() req: Request){
    const user = (req as any).user.userId
    return await this.visit_roomService.update_VisitRoom(id, dto, user)
    }

    @Delete('/delete_VisitRoom/:id')
    @UseGuards(JwtAuthGuard)
    async delete_VisitReferal(@Param('id', ParseIntPipe) id: string){
        return await this.visit_roomService.delete_VisitRoom(id)
    }
}
