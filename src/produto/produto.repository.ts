import { Injectable, NotFoundException } from '@nestjs/common';
import { ProdutoEntity } from './produto.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';

@Injectable()
export class ProdutoRepository {
  constructor(
    @InjectRepository(ProdutoEntity)
    private readonly produtoRepository: Repository<ProdutoEntity>,
  ) {}

  async salvar(produtoEntity: ProdutoEntity) {
    await this.produtoRepository.save(produtoEntity);
  }

  async listar(options?: FindManyOptions<ProdutoEntity>) {
    return await this.produtoRepository.find(options);
  }

  private buscaPorId(id: string) {
    const possivelProduto = this.produtoRepository.findOneBy({id});

    if (!possivelProduto) {
      throw new NotFoundException('Produto não existe');
    }

    return possivelProduto;
  }

  async atualizar(id: string, dadosProduto: Partial<ProdutoEntity>) {
    const dadosNaoAtualizaveis = ['id', 'usuario'];
    const produto = this.buscaPorId(id);
    Object.entries(dadosProduto).forEach(([chave, valor]) => {
      if (dadosNaoAtualizaveis.includes(chave)) {
        return;
      }
      produto[chave] = valor;
    });

    return produto;
  }

  async remover(id: string) {
    const produtoRemovido = this.buscaPorId(id);
    await this.produtoRepository.delete(id);
    return produtoRemovido;
  }
}
