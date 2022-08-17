import { Test, TestingModule } from '@nestjs/testing';
import { AgnoruserService } from './agnoruser.service';

describe('AgnoruserService', () => {
  let service: AgnoruserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AgnoruserService],
    }).compile();

    service = module.get<AgnoruserService>(AgnoruserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
