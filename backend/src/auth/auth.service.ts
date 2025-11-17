import {
  Injectable,
  HttpException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRole, UserStatus } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './create-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt'; // Importe o JwtService
import { LoginDto } from './login.dto'; // Importe o LoginDto

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService, // Injete o JwtService
  ) {}

  // --- FUNÇÃO CREATE COMPLETA E CORRIGIDA ---
  async create(createUserDto: CreateUserDto): Promise<Omit<User, 'password'>> {
    // 1. Verifique se o email já existe
    const userExists = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (userExists) {
      throw new HttpException(
        'Este email já está a ser utilizado.',
        HttpStatus.BAD_REQUEST,
      );
    }

    // 2. Gere o 'salt' e encripte a palavra-passe
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

    // 3. Crie o novo objeto de utilizador com a palavra-passe encriptada
    const newUser = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
      role: UserRole.VOLUNTEER,
      status: UserStatus.PENDING,
    });

    // 4. Salve o novo utilizador no banco
    const savedUser = await this.userRepository.save(newUser); // <-- AQUI ESTÁ a variável que faltava

    // 5. Crie um objeto de resultado sem a palavra-passe
    const { password, ...result } = savedUser;

    // 6. Retorne o resultado
    return result;
  }

  // --- NOSSA NOVA FUNÇÃO DE LOGIN ---
  async login(loginDto: LoginDto) {
    // 1. Encontre o utilizador pelo email
    const user = await this.userRepository.findOne({
      where: { email: loginDto.email },
    });

    // 2. Se o utilizador não existir, lance um erro
    if (!user) {
      throw new UnauthorizedException('Email ou palavra-passe inválidos.');
    }

    // 3. Compare a palavra-passe enviada com a palavra-passe encriptada no banco
    const isPasswordMatching = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    // 4. Se as palavras-passe não baterem, lance um erro
    if (!isPasswordMatching) {
      throw new UnauthorizedException('Email ou palavra-passe inválidos.');
    }

    // 5. Se deu tudo certo, crie o "Passe" (Token JWT)
    const payload = {
      sub: user.id, // 'sub' (subject) é o ID do utilizador
      email: user.email,
      role: user.role,
    };

    // 6. Devolva o "Passe" (token) para o frontend
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}