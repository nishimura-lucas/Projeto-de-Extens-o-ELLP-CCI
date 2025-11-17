import { Test, TestingModule } from '@nestjs/testing';
import { LevantamentoController } from './levantamento.controller';

describe('LevantamentoController', () => {
  let controller: LevantamentoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LevantamentoController],
    }).compile();

    controller = module.get<LevantamentoController>(LevantamentoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
