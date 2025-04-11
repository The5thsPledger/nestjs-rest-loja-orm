import { IsNotEmpty, IsOptional, IsUUID } from "class-validator";

export class PermissaoDTO {
    @IsOptional()
    @IsNotEmpty()
    @IsUUID(undefined, { message: 'ID do perfil inválido' })
    id: string;

    @IsNotEmpty({ message: 'Nome do perfil não pode ser vazio' })
    nome: string;
}