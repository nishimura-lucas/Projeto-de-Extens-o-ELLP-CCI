import { Module } from '@nestjs/common';
    import { TypeOrmModule } from '@nestjs/typeorm';
    import { AppController } from './app.controller';
    import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { VolunteersModule } from './volunteers/volunteers.module';
import { OficinasModule } from './oficinas/oficinas.module';
import { EscolasModule } from './escolas/escolas.module';
import { LevantamentoModule } from './levantamento/levantamento.module';

    @Module({
      imports: [
        TypeOrmModule.forRoot({
          // 1. Configuração do Banco de Dados
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'postgres',
          password: '123456',
          database: 'sigellp_db',
    
          // 2. Configuração de Entidades (Tabelas)
          autoLoadEntities: true,
    
          // 3. Sincronização
          // Isso faz com que o TypeORM crie e atualize automaticamente
          synchronize: true,
        }),
        AuthModule,
        VolunteersModule,
        OficinasModule,
        EscolasModule,
        LevantamentoModule,
      ],
      controllers: [AppController],
      providers: [AppService],
    })
    export class AppModule {}