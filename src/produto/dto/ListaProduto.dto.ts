import { IsOptional, IsString } from 'class-validator';

class ListaCaracteristicaProdutoDTO {
  id: string;
  nome: string;
  descricao: string;
  produto
}

class ListaImagemProdutoDTO {
  id: string;
  url: string;
  descricao: string;
  produto
}

export class ListaProdutoDTO {
  @IsOptional()
  @IsString()
  categoria?: string;

  @IsOptional()
  @IsString()
  id?: string;

  @IsOptional()
  @IsString()
  nome?: string;

  @IsOptional()
  caracteristicas?: ListaCaracteristicaProdutoDTO[];

  @IsOptional()
  imagens: ListaImagemProdutoDTO[];
}
