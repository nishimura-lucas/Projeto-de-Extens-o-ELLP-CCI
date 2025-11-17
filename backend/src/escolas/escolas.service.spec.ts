import { Test, TestingModule } from '@nestjs/testing';
import { EscolasService } from './escolas.service';

describe('EscolasService', () => {
  let service: EscolasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EscolasService],
    }).compile();

    service = module.get<EscolasService>(EscolasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
