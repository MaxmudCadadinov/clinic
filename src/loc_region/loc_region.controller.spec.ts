import { Test, TestingModule } from '@nestjs/testing';
import { LocRegionController } from './loc_region.controller';
import { LocRegionService } from './loc_region.service';

describe('LocRegionController', () => {
  let controller: LocRegionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LocRegionController],
      providers: [LocRegionService],
    }).compile();

    controller = module.get<LocRegionController>(LocRegionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
