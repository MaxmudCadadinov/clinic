import { Controller, Body, Post, Get, Delete, Param, Patch } from '@nestjs/common';
import { LocDistrictService } from './loc_district.service';
import { DTOlocDistrict } from './loc_district.dto/loc_district.dto';
import { Updateloc_districtDto } from './loc_district.dto/update_loc_district.dto';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';
import { RolesGuard } from 'src/guard/roles.guard';
import { Roles } from '../guard/roles.decorator'
import { UseGuards } from '@nestjs/common';



@Controller('loc-district')
export class LocDistrictController {
  constructor(private readonly locDistrictService: LocDistrictService) {}
  @Post('/add_loc-district')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async addLocDistrict(@Body() dto: DTOlocDistrict) {
    return this.locDistrictService.addLocDistrict(dto);
  }

  @Get('/all-loc-districts')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getAllLocDistricts() {
    return this.locDistrictService.getAllLocDistricts();
  }

  @Patch('update_loc-district/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async updateLocDistrict(@Param('id') id: string, @Body() dto: Updateloc_districtDto) {
    return this.locDistrictService.updateLocDistrict(id, dto);
  }

  @Delete('delete_loc-district/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async deleteLocDistrict(@Param('id') id: string) {
    console.log(id);
    return this.locDistrictService.deleteLocDistrict(id);
  }
}


