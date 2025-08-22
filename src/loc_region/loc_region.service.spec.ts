import { Test, TestingModule } from '@nestjs/testing';
import { LocRegionService } from './loc_region.service';

describe('LocRegionService', () => {
  let service: LocRegionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LocRegionService],
    }).compile();

    service = module.get<LocRegionService>(LocRegionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
