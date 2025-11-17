import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRole, UserStatus } from '../auth/user.entity'; // 1. Importe UserStatus
import { Repository } from 'typeorm';

@Injectable()
export class VolunteersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // --- FUNÇÃO 1: Listar Todos os Voluntários (COMPLETA E CORRIGIDA) ---
  async findAllVolunteers(): Promise<Omit<User, 'password'>[]> {
    // 1. Procura no banco todos os 'users' que tenham a 'role' de voluntário
    const volunteers = await this.userRepository.find({
      where: { role: UserRole.VOLUNTEER },
      order: { createdAt: 'DESC' }, // (Opcional) Ordena pelos mais recentes
    });

    // 2. Mapeia a lista para remover a password de cada um
    return volunteers.map((user) => {
      const { password, ...result } = user; // (Técnica que já usámos)
      return result;
    });
  }

  // --- FUNÇÃO 2: Aprovar um Voluntário (COMPLETA E CORRIGIDA) ---
  async approveVolunteer(id: string): Promise<Omit<User, 'password'>> {
    // 3. Procura o utilizador pelo ID
    const user = await this.userRepository.findOne({ where: { id } });

    // 4. Se não encontrar, lança um erro
    if (!user) {
      throw new NotFoundException(`Utilizador com ID "${id}" não encontrado.`);
    }

    // 5. Atualiza o status
    user.status = UserStatus.APPROVED;

    // 6. Salva a mudança no banco
    const savedUser = await this.userRepository.save(user);

    // 7. Devolve o utilizador atualizado (sem a password)
    const { password, ...result } = savedUser;
    return result;
  }
}