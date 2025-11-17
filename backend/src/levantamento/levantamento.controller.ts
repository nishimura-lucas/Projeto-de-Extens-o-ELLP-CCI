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
import { LevantamentoService } from './levantamento.service';
import { CreateLevantamentoDto } from './create-levantamento.dto';

@Controller('levantamento') // O caminho base será /levantamento
export class LevantamentoController {
  constructor(private levantamentoService: LevantamentoService) {}

  // --- 3. (ROTA PÚBLICA) Criar um Registo Anónimo ---
  // (Note a ausência do @UseGuards)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createLevantamentoDto: CreateLevantamentoDto) {
    return this.levantamentoService.create(createLevantamentoDto);
  }

  // --- 4. (ROTA PROTEGIDA) Listar todos os Registos ---
  // (Apenas utilizadores logados - Coordenadores - podem ver)
  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll() {
    return this.levantamentoService.findAll();
  }
}