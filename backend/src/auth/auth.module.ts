import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { JwtModule } from '@nestjs/jwt'; // 1. Importe o JwtModule
import { PassportModule } from '@nestjs/passport'; // 2. Importe o PassportModule
import { JwtStrategy } from './jwt.strategy'; // 3. Importe a nossa Estratégia

@Module({
  imports: [
    // 4. Registe o Passport
    PassportModule.register({ defaultStrategy: 'jwt' }),

    // 5. Registe o Módulo JWT (o "Cofre")
    JwtModule.register({
      secret: 'NOSSO_SEGREDO_SUPER_SEGURO_123456', // (Tem de ser o mesmo da Estratégia)
      signOptions: {
        expiresIn: '1h', // O token expira em 1 hora
      },
    }),

    // 6. Registe a tabela de Utilizadores (como antes)
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy, // 7. Registe a nossa Estratégia como um "Provider"
  ],
  // 8. (NOVA LINHA) Exporte o TypeOrmModule para outros módulos o poderem usar
  exports: [TypeOrmModule],
})
export class AuthModule {}