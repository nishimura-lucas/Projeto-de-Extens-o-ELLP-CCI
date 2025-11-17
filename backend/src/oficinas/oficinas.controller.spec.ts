import { Test, TestingModule } from '@nestjs/testing';
import { OficinasController } from './oficinas.controller';

describe('OficinasController', () => {
  let controller: OficinasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OficinasController],
    }).compile();

    controller = module.get<OficinasController>(OficinasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
