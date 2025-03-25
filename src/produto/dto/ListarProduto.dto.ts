import { IsOptional } from 'class-validator';
import { ProdutoDTO } from './Produto.dto';

export class ListarProdutoDTO extends ProdutoDTO {
  @IsOptional()
  nome?: string;

  @IsOptional()
  categoria?: string;
}
