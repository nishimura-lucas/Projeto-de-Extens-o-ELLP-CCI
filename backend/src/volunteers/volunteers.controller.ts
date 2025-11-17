import {Controller, Get, UseGuards, Patch, Param, ParseUUIDPipe } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { VolunteersService } from './volunteers.service';

@Controller('volunteers')
@UseGuards(JwtAuthGuard) // 2. Protege TODAS as rotas deste módulo
export class VolunteersController {
  constructor(private volunteersService: VolunteersService) {}

  @Get()
  async findAllVolunteers() {
    return this.volunteersService.findAllVolunteers();
  }

  @Patch(':id/approve')
  async approveVolunteer(
    @Param('id', ParseUUIDPipe) id: string, // 3. O ParseUUIDPipe garante que o ID é um UUID válido
  ) {
    return this.volunteersService.approveVolunteer(id);
  }
}