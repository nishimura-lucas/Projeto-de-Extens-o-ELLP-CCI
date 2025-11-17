import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // 1. Importe o "Guarda"
import { EscolasService } from './escolas.service';
import { CreateEscolaDto } from './create-escola.dto';

@Controller('escolas') // O caminho base será /escolas
@UseGuards(JwtAuthGuard) // 2. (IMPORTANTE) Proteja TODAS as rotas de escolas
export class EscolasController {
  constructor(private escolasService: EscolasService) {}

  // --- 3. (NOVA ROTA) Criar uma Escola ---
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createEscolaDto: CreateEscolaDto) {
    return this.escolasService.create(createEscolaDto);
  }

  // --- 4. (NOVA ROTA) Listar todas as Escolas ---
  @Get()
  async findAll() {
    return this.escolasService.findAll();
  }
}