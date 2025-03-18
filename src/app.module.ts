import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '@nestjs/cache-manager';
import { ProdutoModule } from './produto/produto.module';
import { UsuarioModule } from './usuario/usuario.module';
import { PostgresConfigService } from './config/postgres.config.service';
import { PerfilModule } from './perfil/perfil.module';
import dotenv from 'dotenv';
import redisStore from 'cache-manager-redis-store';

dotenv.config();
@Module({
  imports: [
    PerfilModule,
    UsuarioModule,
    ProdutoModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfigService,
      inject: [PostgresConfigService],
    }),
    CacheModule.register({
      store: redisStore,
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      ttl: 5 * 1000 * 60,
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
