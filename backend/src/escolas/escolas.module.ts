import { Module } from '@nestjs/common';
import { EscolasController } from './escolas.controller';
import { EscolasService } from './escolas.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Escola } from './escola.entity'; // 1. Importe a Entidade Escola
import { AuthModule } from '../auth/auth.module'; // 2. Importe o AuthModule

@Module({
  imports: [
    TypeOrmModule.forFeature([Escola]), // 3. Registe a tabela Escola
    AuthModule, // 4. Importe o AuthModule (para o "Guarda")
  ],
  controllers: [EscolasController],
  providers: [EscolasService],
})
export class EscolasModule {}