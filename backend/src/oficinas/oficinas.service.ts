import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Oficina } from './oficina.entity';
import { Repository } from 'typeorm';
import { CreateOficinaDto } from './create-oficina.dto';
import { User } from '../auth/user.entity'; // 1. Importe o User

@Injectable()
export class OficinasService {
  // 2. Injete o "Repositório" (a tabela) de Oficinas
  constructor(
    @InjectRepository(Oficina)
    private oficinaRepository: Repository<Oficina>,
  ) {}

  // 3. (NOVA FUNÇÃO) Criar uma Oficina
  async create(
    createOficinaDto: CreateOficinaDto,
    tutor: User, // 4. Recebe o Utilizador (Professor) que está logado
  ): Promise<Oficina> {
    // 5. Cria o novo objeto de oficina
    const novaOficina = this.oficinaRepository.create({
      ...createOficinaDto,
      tutor: tutor, // 6. (A "LIGAÇÃO") Define o tutor da oficina
    });

    // 7. Salva a nova oficina no banco
    return this.oficinaRepository.save(novaOficina);
  }
}