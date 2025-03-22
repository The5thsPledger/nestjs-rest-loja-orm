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
import { AtualizaProdutoDTO } from './dto/atualizaProduto.dto';
import { CriaProdutoDTO } from './dto/CriaProduto.dto';
import { ProdutoService } from './produto.service';
import { ListaProdutoDTO } from './dto/ListaProduto.dto';
import { CacheInterceptor } from '@nestjs/cache-manager';
@Controller('produtos')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @Post()
  async criarProduto(@Body() dadosProduto: CriaProdutoDTO) {
    return await this.produtoService.criarProduto(dadosProduto);
  }

  @Get()
  @UseInterceptors(CacheInterceptor)
  async listarTodos(
    @Query(new ValidationPipe({ transform: true })) produto?: ListaProdutoDTO,
  ) {
    produto = produto.categoria || produto.id ? produto : null;
    return this.produtoService.listarProdutos(produto);
  }

  @Put('/:id')
  async atualiza(
    @Param('id') id: string,
    @Body() dadosProduto: AtualizaProdutoDTO,
  ) {
    const produtoAlterado = await this.produtoService.atualizaProduto(
      id,
      dadosProduto,
    );

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
