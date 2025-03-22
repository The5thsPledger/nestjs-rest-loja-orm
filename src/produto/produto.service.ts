import { Injectable } from '@nestjs/common';
import { ProdutoEntity } from './entities/produto.entity';
import { AtualizaProdutoDTO } from './dto/AtualizaProduto.dto';
import { ProdutoRepository } from './produto.repository';
import { CriaProdutoDTO } from './dto/CriaProduto.dto';
import { UsuarioService } from 'src/usuario/usuario.service';
import { ListaUsuarioDTO } from 'src/usuario/dto/ListaUsuario.dto';
import { ListaProdutoDTO } from './dto/ListaProduto.dto';

@Injectable()
export class ProdutoService {
  constructor(
    private produtoRepository: ProdutoRepository,
    private usuarioService: UsuarioService
  ) {}

  async criarProduto(dadosProduto: CriaProdutoDTO) {
    const produto = new ProdutoEntity(dadosProduto);
    produto.usuario = (
      await this.usuarioService.getUsuario(
        new ListaUsuarioDTO(dadosProduto.usuarioId),
      )
    )[0];
    return await this.produtoRepository.salvar(produto);
  }

  async listarProdutos(produto?: ListaProdutoDTO) {
    let produtoEntity: ProdutoEntity = null;
    if (produto) {
      produtoEntity = new ProdutoEntity(produto);
      produtoEntity.id = produto.id;
      produtoEntity.categoria = produto.categoria;
    }

    return await this.produtoRepository.listar(produtoEntity);
  }

  async atualizaProduto(id: string, novosDados: AtualizaProdutoDTO) {
    const entityName = await this.produtoRepository.atualizar(id, novosDados);
    Object.assign(entityName, novosDados);
    await this.produtoRepository.salvar(entityName);
  }

  async deletaProduto(id: string) {
    await this.produtoRepository.remover(id);
  }
}
