import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

// 1. Esta é a "Estratégia" do nosso "Guarda" (Segurança).
// Ela sabe COMO ler e validar o token JWT.

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // 2. Diz ao Passport para procurar o token no "cabeçalho" (Header)
      //    da requisição, especificamente no campo 'Authorization'
      //    (Ex: "Bearer eyJhbGciOiJI...")
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

      // 3. Ignora se o token expirou (para fins de desenvolvimento,
      //    em produção isto seria 'false')
      ignoreExpiration: false,

      // 4. (IMPORTANTE) Este é o SEGREDO que usámos para assinar o token.
      //    Tem de ser O MESMO que está no 'auth.module.ts'.
      secretOrKey: 'NOSSO_SEGREDO_SUPER_SEGURO_123456',
    });
  }

  // 5. Esta função é chamada DEPOIS que o token é validado com sucesso.
  //    O 'payload' é o conteúdo que colocámos dentro do token
  //    (o ID, email e a role do utilizador).
  async validate(payload: any) {
    // 6. O que esta função retorna será injetado no objeto 'request'
    //    do NestJS, dentro de 'request.user'.
    //    Isto permite-nos aceder ao utilizador logado em qualquer rota
    //    protegida.
    return {
      userId: payload.sub,
      email: payload.email,
      role: payload.role,
    };
  }
}