import { Test, TestingModule } from '@nestjs/testing';
import { EscolasController } from './escolas.controller';

describe('EscolasController', () => {
  let controller: EscolasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EscolasController],
    }).compile();

    controller = module.get<EscolasController>(EscolasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
