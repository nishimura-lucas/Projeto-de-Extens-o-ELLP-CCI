import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// 1. Este é o nosso "Segurança"
// Ele usa a "Estratégia" (jwt.strategy.ts) para decidir se
// deixa ou não o utilizador aceder à rota.

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  // (Opcional) Pode adicionar lógicas personalizadas aqui.
  // Por agora, o comportamento padrão (herdar do AuthGuard)
  // é tudo o que precisamos. Ele vai automaticamente
  // executar a JwtStrategy e bloquear ou permitir o acesso.
}