import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Levantamento } from './levantamento.entity';
import { Repository } from 'typeorm';
import { CreateLevantamentoDto } from './create-levantamento.dto';

@Injectable()
export class LevantamentoService {
  // 1. Injete o "Repositório" (a tabela) de Levantamentos
  constructor(
    @InjectRepository(Levantamento)
    private levantamentoRepository: Repository<Levantamento>,
  ) {}

  // --- 2. (NOVA FUNÇÃO) Criar um Registo Anónimo ---
  async create(
    createLevantamentoDto: CreateLevantamentoDto,
  ): Promise<Levantamento> {
    const novoLevantamento = this.levantamentoRepository.create(
      createLevantamentoDto,
    );
    // Nota: Nenhum 'user' ou 'tutor' é associado
    return this.levantamentoRepository.save(novoLevantamento);
  }

  // --- 3. (NOVA FUNÇÃO) Listar todos os Registos ---
  async findAll(): Promise<Levantamento[]> {
    return this.levantamentoRepository.find({
      order: { createdAt: 'DESC' }, // Ordena pelos mais recentes
    });
  }
}