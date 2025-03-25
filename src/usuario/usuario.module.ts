import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioController } from './usuario.controller';
import { EmailEhUnicoValidator } from './validacao/email-eh-unico.validator';
import { UsuarioService } from './usuario.service';
import { UsuarioEntity } from './usuario.entity';
import { UsuarioRepository } from './usuario.repository';
import { PermissaoService } from 'src/permissao/permissao.service';
import { PermissaoEntity } from 'src/permissao/permissao.entity';
import { PermissaoRepository } from 'src/permissao/permissao.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UsuarioEntity, PermissaoEntity])],
  controllers: [UsuarioController],
  providers: [
    UsuarioService,
    UsuarioRepository,
    EmailEhUnicoValidator,
    PermissaoService,
    PermissaoRepository,
  ],
})
export class UsuarioModule {}
