import { Module } from '@nestjs/common';
import { VolunteersController } from './volunteers.controller';
import { VolunteersService } from './volunteers.service';
import { AuthModule } from '../auth/auth.module'; // 1. Importe o AuthModule

@Module({
  imports: [AuthModule], // 2. Adicione o AuthModule aos imports
  controllers: [VolunteersController],
  providers: [VolunteersService],
})
export class VolunteersModule {}