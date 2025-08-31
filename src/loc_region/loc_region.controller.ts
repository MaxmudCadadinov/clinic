import { Controller, Post, Body, Get, Param, Delete, Patch,ParseIntPipe, Query } from '@nestjs/common';
import { LocRegionService } from './loc_region.service';
import { DTOlocRegion } from './loc_region.dto/loc_region.dto';
import { UpdateRegionDto } from './loc_region.dto/update_loc_region.dto';
import { LocRegionFilterDto } from './loc_region.dto/RegionFilterDto'

@Controller('loc-region')
export class LocRegionController {
  constructor(private readonly locRegionService: LocRegionService) {}

  @Post('/add-loc-region')
  async addLocRegion(@Body() dto: DTOlocRegion) {
    return await this.locRegionService.addLocRegion(dto);
  }

  @Get('/all-loc-regions')
  async getAllLocRegions(@Query() dto: LocRegionFilterDto) {
    return await this.locRegionService.getAllLocRegions(dto);
  }

@Patch('/loc_region_update/:id')
  async updateLocRegion(@Param('id', ParseIntPipe) id: string, @Body() dto: UpdateRegionDto) {
    return await this.locRegionService.updateLocRegion(id, dto);
  }

  @Delete('delete_region/:id')
  async deleteLocRegion(@Param('id', ParseIntPipe) id: string) {
    //console.log(id);
    return await this.locRegionService.deleteLocRegion(id);
  }
}
