import { IsNotEmpty, IsUUID, IsString, IsOptional, MaxLength } from "class-validator";

export class ProdutoCaracteristicaDTO {
  @IsOptional()
  @IsNotEmpty({ message: 'ID de característica não pode ser vazio' })
  @IsUUID(undefined, { message: 'ID de característica inválido' })
  id: string;

  @IsNotEmpty({ message: 'Nome da característica não pode ser vazio' })
  @IsString()
  @MaxLength(100, { message: 'Nome da característica não pode ter mais que 100 caracteres' })
  nome: string;

  @IsNotEmpty({ message: 'Descrição da característica não pode ser vazio' })
  @IsString()
  @MaxLength(255, { message: 'Descrição da característica não pode ter mais que 255 caracteres' })
  descricao: string;
}