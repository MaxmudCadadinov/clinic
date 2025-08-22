import { Test, TestingModule } from '@nestjs/testing';
import { LocDistrictController } from './loc_district.controller';
import { LocDistrictService } from './loc_district.service';

describe('LocDistrictController', () => {
  let controller: LocDistrictController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LocDistrictController],
      providers: [LocDistrictService],
    }).compile();

    controller = module.get<LocDistrictController>(LocDistrictController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
