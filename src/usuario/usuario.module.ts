import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioController } from './usuario.controller';
import { EmailEhUnicoValidator } from './validacao/email-eh-unico.validator';
import { UsuarioService } from './usuario.service';
import { UsuarioEntity } from './usuario.entity';
import { UsuarioRepository } from './usuario.repository';
import { PerfilService } from 'src/perfil/perfil.service';
import { PerfilRepository } from 'src/perfil/perfil.repository';
import { PerfilEntity } from 'src/perfil/perfil.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UsuarioEntity, PerfilEntity])],
  controllers: [UsuarioController],
  providers: [
    UsuarioService,
    UsuarioRepository,
    EmailEhUnicoValidator,
    PerfilService,
    PerfilRepository,
  ],
})
export class UsuarioModule {}
