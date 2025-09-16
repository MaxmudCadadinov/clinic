import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { VisitServiceService } from './visit_service.service';
import { CreateVisitServiceDto } from './visit_serviceDto.ts/createVisitService'
import { UpdateVisitServiceDto } from './visit_serviceDto.ts/updateVisitService';
import { FilterVisitServiceDto } from './visit_serviceDto.ts/filterVisitService';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';
import { RolesGuard } from 'src/guard/roles.guard';



@Controller('visit-service')
export class VisitServiceController {
  constructor(private readonly visitServiceService: VisitServiceService) {}

  @Post('/addVisit-service')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async add_v_s(@Body() dto: CreateVisitServiceDto, @Req() req: Request){
    const user = (req as any).user.userId
    return await this.visitServiceService.add_v_s(dto, req)
  }

  @Get('/all-visit-service')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async get_V_S(@Query() dto: FilterVisitServiceDto){
    return await this.visitServiceService.get_v_s(dto)
  }

  @Patch('/update-visit-service')
  @UseGuards(JwtAuthGuard)
  async update_v_s(@Param('id', ParseIntPipe) id: string, @Body() dto: UpdateVisitServiceDto, @Req() req: Request){
    const user = (req as any).user.userId
    return await this.visitServiceService.update_v_ss(id, dto, user)
  }

  @Delete('/delete-visit-service/:id')
  @UseGuards(JwtAuthGuard)
  async delete_v_s(@Param('id', ParseIntPipe) id: string){
    return await this.visitServiceService.delete_v_s(id)
  }

}
