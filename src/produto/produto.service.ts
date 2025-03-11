import { Injectable } from '@nestjs/common';
import { ProdutoEntity } from './produto.entity';
import { AtualizaProdutoDTO } from './dto/AtualizaProduto.dto';
import { ProdutoRepository } from './produto.repository';
import { CriaProdutoDTO } from './dto/CriaProduto.dto';
import { randomUUID } from 'crypto';
import { UsuarioService } from 'src/usuario/usuario.service';

@Injectable()
export class ProdutoService {
  constructor(private produtoRepository: ProdutoRepository) {}
  private usuarioService: UsuarioService;

  async criaProduto(dadosProduto: CriaProdutoDTO) {
    await this.produtoRepository.salvar(
      {
        id: randomUUID(),
        nome: dadosProduto.nome,
        usuario: await this.usuarioService.listUsuarios(null, dadosProduto.usuarioId),
        valor: dadosProduto.valor,
        quantidade: dadosProduto.quantidade,
        descricao: dadosProduto.descricao,
        categoria: dadosProduto.categoria,
        caracteristicas: dadosProduto.caracteristicas,
        imagens: dadosProduto.imagens,
      } as unknown as ProdutoEntity
    );
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
