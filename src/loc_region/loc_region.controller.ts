import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { LocRegionService } from './loc_region.service';
import { DTOlocRegion } from './loc_region.dto/loc_region.dto';
@Controller('loc-region')
export class LocRegionController {
  constructor(private readonly locRegionService: LocRegionService) {}

  @Post('/add-loc-region')
  async addLocRegion(@Body() dto: DTOlocRegion) {
    return await this.locRegionService.addLocRegion(dto);
  }

  @Get('/all-loc-regions')
  async getAllLocRegions() {
    return await this.locRegionService.getAllLocRegions();
  }

  @Delete(':id')
  async deleteLocRegion(@Param('id') id: string) {
    console.log(id);
    return await this.locRegionService.deleteLocRegion(id);
  }
}
