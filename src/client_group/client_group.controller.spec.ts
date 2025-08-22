import { Test, TestingModule } from '@nestjs/testing';
import { ClientGroupController } from './client_group.controller';
import { ClientGroupService } from './client_group.service';

describe('ClientGroupController', () => {
  let controller: ClientGroupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientGroupController],
      providers: [ClientGroupService],
    }).compile();

    controller = module.get<ClientGroupController>(ClientGroupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
