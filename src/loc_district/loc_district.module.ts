import { Module } from '@nestjs/common';
import { LocDistrictService } from './loc_district.service';
import { LocDistrictController } from './loc_district.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { loc_districtEntitiy } from './loc_district.entity/loc_district.entity';
import { loc_regionEntitiy } from 'src/loc_region/loc_region.entity/loc_region.entity';

@Module({
  controllers: [LocDistrictController],
  providers: [LocDistrictService],
  imports: [
    TypeOrmModule.forFeature([loc_districtEntitiy,loc_regionEntitiy]),
  ],

})
export class LocDistrictModule {}
