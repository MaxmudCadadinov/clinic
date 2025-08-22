import { Controller, Body, Post, Get, Delete, Param } from '@nestjs/common';
import { LocDistrictService } from './loc_district.service';
import { DTOlocDistrict } from './loc_district.dto/loc_district.dto';

@Controller('loc-district')
export class LocDistrictController {
  constructor(private readonly locDistrictService: LocDistrictService) {}
  @Post()
  async addLocDistrict(@Body() dto: DTOlocDistrict) {
    return this.locDistrictService.addLocDistrict(dto);
  }

  @Get('/all-loc-districts')
  async getAllLocDistricts() {
    return this.locDistrictService.getAllLocDistricts();
  }

  @Delete(':id')
  async deleteLocDistrict(@Param('id') id: string) {
    console.log(id);
    return this.locDistrictService.deleteLocDistrict(id);
  }
}
