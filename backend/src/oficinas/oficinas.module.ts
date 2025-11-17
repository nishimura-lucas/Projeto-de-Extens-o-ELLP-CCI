import { Module } from '@nestjs/common';
import { OficinasController } from './oficinas.controller';
import { OficinasService } from './oficinas.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Oficina } from './oficina.entity'; // 1. Importe a Entidade Oficina
import { AuthModule } from '../auth/auth.module'; // 2. Importe o AuthModule

@Module({
  imports: [
    TypeOrmModule.forFeature([Oficina]), // 3. Registe a tabela Oficina
    AuthModule, // 4. Importe o AuthModule (para o "Guarda" e o 'User')
  ],
  controllers: [OficinasController],
  providers: [OficinasService],
})
export class OficinasModule {}