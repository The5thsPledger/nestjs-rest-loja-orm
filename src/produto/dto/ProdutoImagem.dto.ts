import { IsNotEmpty, IsUUID, IsUrl, IsString, IsOptional, MaxLength } from "class-validator";

export class ProdutoImagemDTO {
  @IsOptional()
  @IsNotEmpty({ message: 'ID de imagem não pode ser vazio' })
  @IsUUID(undefined, { message: 'ID de imagem inválido' })
  id: string;

  @IsNotEmpty({ message: 'URL para imagem não pode ser vazio' })
  @IsString()
  @MaxLength(100, { message: 'URL para imagem não pode ter mais que 100 caracteres' })
  @IsUrl({}, { message: 'URL para imagem inválida' })
  url: string;

  @IsNotEmpty({ message: 'Descrição da imagem não pode ser vazia' })
  @IsString()
  @MaxLength(100, { message: 'Descrição da imagem não pode ter mais que 100 caracteres' })
  descricao: string;
}