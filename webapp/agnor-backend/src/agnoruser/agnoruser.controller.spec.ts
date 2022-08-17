import { Test, TestingModule } from '@nestjs/testing';
import { AgnoruserController } from './agnoruser.controller';

describe('AgnoruserController', () => {
  let controller: AgnoruserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AgnoruserController],
    }).compile();

    controller = module.get<AgnoruserController>(AgnoruserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
