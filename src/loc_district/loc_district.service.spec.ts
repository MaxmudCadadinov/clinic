import { Test, TestingModule } from '@nestjs/testing';
import { LocDistrictService } from './loc_district.service';

describe('LocDistrictService', () => {
  let service: LocDistrictService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LocDistrictService],
    }).compile();

    service = module.get<LocDistrictService>(LocDistrictService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
