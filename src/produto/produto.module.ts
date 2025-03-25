import { Module } from '@nestjs/common';
import { ProdutoController } from './produto.controller';
import { ProdutoEntity } from './entities/produto.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdutoService } from './produto.service';
import { ProdutoRepository } from './produto.repository';
import { UsuarioService } from 'src/usuario/usuario.service';
import { PermissaoService } from 'src/permissao/permissao.service';
import { UsuarioRepository } from 'src/usuario/usuario.repository';
import { UsuarioEntity } from 'src/usuario/usuario.entity';
import { PermissaoEntity } from 'src/permissao/permissao.entity';
import { PermissaoRepository } from 'src/permissao/permissao.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ProdutoEntity, UsuarioEntity, PermissaoEntity])],
  controllers: [ProdutoController],
  providers: [
    ProdutoService,   ProdutoRepository, 
    UsuarioService,   UsuarioRepository, 
    PermissaoService, PermissaoRepository
  ],
})
export class ProdutoModule {}
