import { Controller, UseGuards, Post, Body, Req, Get, Query, Patch, Param, ParseIntPipe, Delete } from '@nestjs/common';
import { ReferalService } from './referal.service'
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';
import { RolesGuard } from 'src/guard/roles.guard';
import { CreateReferalDto } from './referalDto/createReferalDto';
import { FilterReferalDto } from './referalDto/filerReferalDto'
import { UpdateReferalDto } from './referalDto/updateReferalDto';


@Controller('referal')
export class ReferalController {
    constructor(
        private readonly referalService:  ReferalService){}

    
    @Post('/add_referal')
    @UseGuards(JwtAuthGuard, RolesGuard)
    async add_referal(@Body() dto: CreateReferalDto, @Req() req: Request ){
        const user = (req as any).user.userId
    return await this.referalService.add_referal(dto, user)
    }

    @Get('/all_referals')
    @UseGuards(JwtAuthGuard)
    async get_all_referals(@Query() dto: FilterReferalDto){
        return await this.referalService.get_all_referals(dto)
    }

    @Patch('/update_referal/:id')
    @UseGuards(JwtAuthGuard)
    async update_referal(@Param('id', ParseIntPipe) id: string, @Body() dto: UpdateReferalDto, @Req() req: Request ){
        const user = (req as any).user.userId
        return await this.referalService.update_referal(id, dto, user)
    }

    @Delete('/delete_referal/:id')
    @UseGuards(JwtAuthGuard)
    async delete_referal(@Param('id', ParseIntPipe) id: string){
        return await this.referalService.delete_referal(id)
    }

    }
