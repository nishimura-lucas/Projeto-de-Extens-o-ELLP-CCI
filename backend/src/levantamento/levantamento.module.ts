import { Module } from '@nestjs/common';
import { LevantamentoController } from './levantamento.controller';
import { LevantamentoService } from './levantamento.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Levantamento } from './levantamento.entity'; // 1. Importe a Entidade
import { AuthModule } from '../auth/auth.module'; // 2. Importe o AuthModule

@Module({
  imports: [
    TypeOrmModule.forFeature([Levantamento]), // 3. Registe a tabela
    AuthModule, // 4. Importe o AuthModule (para o "Guarda")
  ],
  controllers: [LevantamentoController],
  providers: [LevantamentoService],
})
export class LevantamentoModule {}