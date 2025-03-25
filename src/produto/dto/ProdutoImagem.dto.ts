import { IsNotEmpty, IsUUID, IsUrl, IsString } from "class-validator";

export class ProdutoImagemDTO {
    @IsNotEmpty({ message: 'ID de imagem não pode ser vazio' })
    @IsUUID(undefined, { message: 'ID de imagem inválido' })
    id?: string;

    @IsNotEmpty({ message: 'URL para imagem não pode ser vazio' })
    @IsUrl({}, { message: 'URL para imagem inválida' })
    url?: string;

    @IsNotEmpty({ message: 'Descrição da imagem não pode ser vazia' })
    @IsString()
    descricao?: string;
  }