import { Test, TestingModule } from '@nestjs/testing';
import { AutheController } from './authe.controller';

describe('AutheController', () => {
  let controller: AutheController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AutheController],
    }).compile();

    controller = module.get<AutheController>(AutheController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
