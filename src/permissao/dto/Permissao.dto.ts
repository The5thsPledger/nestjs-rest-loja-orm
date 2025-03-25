import { IsNotEmpty, IsOptional, IsUUID } from "class-validator";

export class PermissaoDTO {
    @IsNotEmpty()
    @IsUUID(undefined, { message: 'ID do perfil inválido' })
    id?: string;

    @IsNotEmpty({ message: 'Nome do perfil não pode ser vazio' })
    nome?: string;

    @IsOptional()
    @IsNotEmpty({ message: 'Data de criação não pode ser vazia' })
    dataCriacao: Date;

    @IsOptional()
    @IsNotEmpty({ message: 'Data de atualização não pode ser vazia' })
    dataAtualizacao: Date;

    @IsOptional()
    @IsNotEmpty({ message: 'Data de exclusão não pode ser vazia' })
    dataExclusao: Date;
}