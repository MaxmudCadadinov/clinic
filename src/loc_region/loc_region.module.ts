import { Module } from '@nestjs/common';
import { LocRegionService } from './loc_region.service';
import { LocRegionController } from './loc_region.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { loc_regionEntitiy } from './loc_region.entity/loc_region.entity';

@Module({
  controllers: [LocRegionController],
  providers: [LocRegionService],
  imports: [
    TypeOrmModule.forFeature([loc_regionEntitiy]),
  ],
})
export class LocRegionModule {}
