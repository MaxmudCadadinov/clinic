import { Controller, Post, Get, Delete, Patch, Param, Body } from '@nestjs/common';
import { SourceService } from './source.service';
import { DTOSource } from './source.dto/source.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';
import { RolesGuard } from '../guard/roles.guard';
import { Roles } from '../guard/roles.decorator';
import { UpdateSourceDto } from './source.dto/update_source.dto';


@Controller('source')
export class SourceController {
  constructor(private readonly sourceService: SourceService) {}

  @Post('/add_source')
  async addSource(dto: DTOSource) {
    return this.sourceService.addSource(dto);
  }

  @Get('/all_sources')
  @UseGuards(JwtAuthGuard)
  async getAllSources() {
    return this.sourceService.getAllSources();
  }

  @Patch('/update/:id')
  @UseGuards(JwtAuthGuard)
  async updateSource(@Param('id') id: string, @Body() dto: UpdateSourceDto) {
    return this.sourceService.updateSource(id, dto);
  }

  @Delete('/delete/:id')
  @UseGuards(JwtAuthGuard)
  async deleteSource(@Param('id') id: string) {
    return this.sourceService.deleteSource(id);
  }

}
