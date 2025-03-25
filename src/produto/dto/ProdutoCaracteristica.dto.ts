import { IsNotEmpty, IsUUID, IsString } from "class-validator";

export class ProdutoCaracteristicaDTO {
    @IsNotEmpty({ message: 'ID de característica não pode ser vazio' })
    @IsUUID(undefined, { message: 'ID de característica inválido' })
    id?: string;

    @IsNotEmpty({ message: 'Nome da característica não pode ser vazio' })
    @IsString()
    nome?: string;

    @IsNotEmpty({ message: 'Descrição da característica não pode ser vazio' })
    @IsString()
    descricao?: string;
  }