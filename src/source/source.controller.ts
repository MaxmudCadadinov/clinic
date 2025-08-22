import { Controller, Post } from '@nestjs/common';
import { SourceService } from './source.service';
import { DTOSource } from './source.dto/source.dto';

@Controller('source')
export class SourceController {
  constructor(private readonly sourceService: SourceService) {}

  @Post('/add_source')
  async addSource(dto: DTOSource) {
    return this.sourceService.addSource(dto);
  }
}
