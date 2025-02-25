import { Injectable } from '@nestjs/common';
import { ProdutoEntity } from './produto.entity';
import { AtualizaProdutoDTO } from './dto/AtualizaProduto.dto';
import { ProdutoRepository } from './produto.repository';

@Injectable()
export class ProdutoService {
  constructor(private produtoRepository: ProdutoRepository) {}

  async criaProduto(produtoEntity: ProdutoEntity) {
    await this.produtoRepository.salvar(produtoEntity);
  }

  async listProdutos(categoria? : string) {
    let whereClause: any = {};
    if (categoria) {
      whereClause = categoria;
    }

    return await this.produtoRepository.listar({
      relations: {
        imagens: true,
        caracteristicas: true,
      },
      where : whereClause
    });
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
