import { IsOptional, IsString } from "class-validator";

class ListaCaracteristicaProdutoDTO {
  nome: string;
  descricao: string;
}

class ListaImagemProdutoDTO {
  url: string;
  descricao: string;
}

export class ListaProdutoDTO {
  @IsOptional()
  @IsString()
  categoria?: string
  
  @IsOptional()
  @IsString()
  id?: string
  
  @IsOptional()
  @IsString()
  nome?: string

  @IsOptional()
  caracteristicas?: ListaCaracteristicaProdutoDTO[]

  @IsOptional()
  imagens: ListaImagemProdutoDTO[]

  constructor(
    id              : string,
    nome            : string,
    caracteristicas : ListaCaracteristicaProdutoDTO[],
    imagens         : ListaImagemProdutoDTO[],
    categoria       : string
  ) {
    id              = this.id
    nome            = this.nome
    caracteristicas = this.caracteristicas
    imagens         = this.imagens
    categoria       = this.categoria
  }
}
