import { Test, TestingModule } from '@nestjs/testing';
import { LevantamentoService } from './levantamento.service';

describe('LevantamentoService', () => {
  let service: LevantamentoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LevantamentoService],
    }).compile();

    service = module.get<LevantamentoService>(LevantamentoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
