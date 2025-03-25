import {
  IsOptional,
} from 'class-validator';
import { ProdutoDTO } from './Produto.dto';

export class AtualizarProdutoDTO extends ProdutoDTO {
  @IsOptional()
  nome: string;

  @IsOptional()
  valor: number;

  @IsOptional()
  quantidade: number;

  @IsOptional()
  descricao: string;
  
  @IsOptional()
  categoria: string;
}
