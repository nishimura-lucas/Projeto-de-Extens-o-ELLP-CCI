import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // 1. Importe o "Guarda"
import { OficinasService } from './oficinas.service';
import { CreateOficinaDto } from './create-oficina.dto';

@Controller('oficinas') // O caminho base será /oficinas
@UseGuards(JwtAuthGuard) // 2. (IMPORTANTE) Proteja TODAS as rotas de oficinas
export class OficinasController {
  constructor(private oficinasService: OficinasService) {}

  // 3. (NOVA ROTA) Criar uma Oficina
  @Post()
  @HttpCode(HttpStatus.CREATED) // (Opcional) Define o código HTTP para 201 (Created)
  async create(
    @Body() createOficinaDto: CreateOficinaDto, // 4. Pega os dados do corpo
    @Request() req, // 5. Pega o "req" (que tem os dados do utilizador logado)
  ) {
    // 6. O 'req.user' foi colocado lá pelo nosso JwtAuthGuard
    const tutor = req.user;
    return this.oficinasService.create(createOficinaDto, tutor);
  }
}