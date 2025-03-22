import { Module } from '@nestjs/common';
import { ProdutoController } from './produto.controller';
import { ProdutoEntity } from './entities/produto.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdutoService } from './produto.service';
import { ProdutoRepository } from './produto.repository';
import { UsuarioService } from 'src/usuario/usuario.service';
import { PerfilService } from 'src/perfil/perfil.service';
import { UsuarioRepository } from 'src/usuario/usuario.repository';
import { UsuarioEntity } from 'src/usuario/usuario.entity';
import { PerfilRepository } from 'src/perfil/perfil.repository';
import { PerfilEntity } from 'src/perfil/perfil.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProdutoEntity, UsuarioEntity, PerfilEntity])],
  controllers: [ProdutoController],
  providers: [ProdutoService, ProdutoRepository, UsuarioService, UsuarioRepository, PerfilService, PerfilRepository],
})
export class ProdutoModule {}
