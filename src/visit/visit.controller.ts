import { Controller, UseGuards, Post, Req, Body, Get, Query,Param, Patch, ParseIntPipe, Delete } from '@nestjs/common';
import { VisitService } from './visit.service'
import { CreateVisitDto } from './visitDto/createVisit.dto'
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';
import { RolesGuard } from 'src/guard/roles.guard';
import { FilterVisitDto } from './visitDto/filter_visit.dto'
import { UpdateVisitDto } from './visitDto/updateVisit.dto'

@Controller('visit')
export class VisitController {
    constructor(private readonly visitService: VisitService){}

    @Post('/add_visit')
    @UseGuards(JwtAuthGuard, RolesGuard)
    async addVisit(@Body() dto: CreateVisitDto, @Req() req: Request){
        const user = (req as any).user.userId ;
        return await this.visitService.addVisit(dto, user)
    }

    
    @Get('/all_visits')
    @UseGuards(JwtAuthGuard, RolesGuard)
    async get_all_visits(@Query() dto:FilterVisitDto ){
        return await this.visitService.all_visits(dto)
    }

    @Patch('/update_visit/:id')
    @UseGuards(JwtAuthGuard)
    async update_visit(@Param('id', ParseIntPipe) id: string, @Body() dto: UpdateVisitDto, @Req() req: Request){
        const user = (req as any).user.userId
        return await this.visitService.update_visit(id, dto, user)
    }

    @Delete('/delete_visit/:id')
    @UseGuards(JwtAuthGuard)
    async delete_visit(@Param('id', ParseIntPipe) id: string){
        return await this.visitService.delete_visit(id)
    }
}
