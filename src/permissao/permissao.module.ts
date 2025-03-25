import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissaoEntity } from './permissao.entity';
import { PermissaoController } from './permissao.controller';
import { PermissaoService } from './permissao.service';
import { IsNomeUnicoValidator } from './validacao/is-nome-unico.validator';
import { PermissaoRepository } from './permissao.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PermissaoEntity])],
  controllers: [PermissaoController],
  providers: [PermissaoService, PermissaoRepository, IsNomeUnicoValidator],
})
export class PermissaoModule {}
