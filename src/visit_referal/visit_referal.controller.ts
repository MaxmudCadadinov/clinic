import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { VisitReferalService } from './visit_referal.service';
import { CreateVisitReferalDto } from './visit_referalDto/create_visit_referal';
import { UpdateVisitReferalDto } from './visit_referalDto/updateVisit_referal.dto';
import { FilterVisitReferalDto } from './visit_referalDto/filterVisit_referal';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';
import { RolesGuard } from 'src/guard/roles.guard';






@Controller('visit-referal')
export class VisitReferalController {
    constructor(private readonly visit_referalService: VisitReferalService){}

    @Post('/addVisit_referal')
    @UseGuards(JwtAuthGuard, RolesGuard)
    async add_v_r(@Body() dto: CreateVisitReferalDto, @Req() req: Request){
        const user = (req as any).user.userId 
        return await this.visit_referalService.addVisit_referal(dto, user)
    }

    @Get('/allVisitReferals')
    @UseGuards(JwtAuthGuard, RolesGuard)
    async all_VisitReferals(@Query() dto: FilterVisitReferalDto){
        return await this.visit_referalService.all_VisitReferals(dto)
    }

    @Patch('/update_VisitReferals/:id')
    @UseGuards(JwtAuthGuard)
    async update_VisitReferals(@Param('id', ParseIntPipe) id: string, @Body() dto: UpdateVisitReferalDto, @Req() req: Request){
    const user = (req as any).user.userId
    return await this.visit_referalService.update_VisitReferals(id, dto, user)
    }

    @Delete('/delete_VisitReferal/:id')
    @UseGuards(JwtAuthGuard)
    async delete_VisitReferal(@Param('id', ParseIntPipe) id: string){
        return await this.visit_referalService.delete_VisitReferal(id)
    }
}
