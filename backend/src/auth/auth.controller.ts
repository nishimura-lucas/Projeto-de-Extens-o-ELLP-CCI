import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Get,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './create-user.dto';
import { LoginDto } from './login.dto';
import { JwtAuthGuard } from './jwt-auth.guard'; // 1. Importe o nosso "Guarda"

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // --- Rota de Registo (Já existia) ---
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() createUserDto: CreateUserDto) {
    const user = await this.authService.create(createUserDto);
    return user;
  }

  // --- Rota de Login (Já existia) ---
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  // --- NOSSA NOVA ROTA PROTEGIDA ---
  // 2. Use o "Guarda" (Segurança) nesta rota
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    // 3. Graças ao 'validate' da nossa Estratégia (JwtStrategy),
    //    o 'req.user' agora contém o 'payload' do token
    //    (com o ID, email e role do utilizador logado).
    return {
      message: 'Você está autenticado! Estes são os seus dados:',
      user: req.user,
    };
  }
}