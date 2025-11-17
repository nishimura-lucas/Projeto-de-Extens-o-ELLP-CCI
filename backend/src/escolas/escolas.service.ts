import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Escola } from './escola.entity';
import { Repository } from 'typeorm';
import { CreateEscolaDto } from './create-escola.dto';

@Injectable()
export class EscolasService {
  // 1. Injete o "Repositório" (a tabela) de Escolas
  constructor(
    @InjectRepository(Escola)
    private escolaRepository: Repository<Escola>,
  ) {}

  // --- 2. (NOVA FUNÇÃO) Criar uma Escola ---
  async create(createEscolaDto: CreateEscolaDto): Promise<Escola> {
    const novaEscola = this.escolaRepository.create(createEscolaDto);
    return this.escolaRepository.save(novaEscola);
  }

  // --- 3. (NOVA FUNÇÃO) Listar todas as Escolas ---
  async findAll(): Promise<Escola[]> {
    return this.escolaRepository.find({
      order: { nome: 'ASC' }, // Ordena por nome
    });
  }
}