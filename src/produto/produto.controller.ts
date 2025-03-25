import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { AtualizarProdutoDTO } from './dto/AtualizarProduto.dto';
import { ProdutoService } from './produto.service';
import { ListarProdutoDTO } from './dto/ListarProduto.dto';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { ProdutoDTO } from './dto/Produto.dto';
@Controller('produtos')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @Post()
  async criarProduto(@Body() dadosProduto: ProdutoDTO) {
    return await this.produtoService.criarProduto(dadosProduto);
  }

  @Get()
  @UseInterceptors(CacheInterceptor)
  async listarTodos(
    @Query(new ValidationPipe({ transform: true })) produto?: ListarProdutoDTO,
  ) {
    produto = produto.categoria || produto.id ? produto : null;
    return this.produtoService.listarProdutos(produto);
  }

  @Put('/:id')
  async atualiza(
    @Param('id') id: string,
    @Body() dadosProduto: AtualizarProdutoDTO,
  ) {
    dadosProduto.id = id;
    const produtoAlterado = await this.produtoService.atualizarProduto(dadosProduto);

    return {
      mensagem: 'produto atualizado com sucesso',
      produto: produtoAlterado,
    };
  }

  @Delete('/:id')
  async remove(@Param('id') id: string) {
    const produtoRemovido = await this.produtoService.deletaProduto(id);

    return {
      mensagem: 'produto removido com sucesso',
      produto: produtoRemovido,
    };
  }
}
