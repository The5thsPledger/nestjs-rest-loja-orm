import { Injectable } from '@nestjs/common';
import { ProdutoEntity } from './entities/produto.entity';
import { AtualizarProdutoDTO } from './dto/AtualizarProduto.dto';
import { ProdutoRepository } from './produto.repository';
import { UsuarioService } from 'src/usuario/usuario.service';
import { ListarProdutoDTO } from './dto/ListarProduto.dto';
import { ProdutoDTO } from './dto/Produto.dto';

@Injectable()
export class ProdutoService {
  constructor(
    private produtoRepository: ProdutoRepository,
    private usuarioService: UsuarioService
  ) {}

  async criarProduto(dadosProduto: ProdutoDTO) {
    const produto = new ProdutoEntity(dadosProduto);
    // produto.usuario = (
    //   await this.usuarioService.getUsuario(
    //     plainToInstance(ListarUsuarioDTO, {usuarioId: dadosProduto.usuarioId})
    //   )
    // )[0];
    return await this.produtoRepository.salvar(produto);
  }

  async listarProdutos(produto?: ListarProdutoDTO) {
    let produtoEntity: ProdutoEntity = null;
    if (produto) {
      produtoEntity = new ProdutoEntity(produto);
      produtoEntity.id = produto.id;
      produtoEntity.categoria = produto.categoria;
    }

    return await this.produtoRepository.listarProduto(produtoEntity);
  }

  async atualizarProduto(novosDados: AtualizarProdutoDTO) {
    const entityName = await this.produtoRepository.atualizar(new ProdutoEntity(novosDados));
    Object.assign(entityName, novosDados);
    await this.produtoRepository.salvar(entityName);
  }

  async deletaProduto(id: string) {
    await this.produtoRepository.remover(id);
  }
}
