import { Type } from "class-transformer";
import { ArrayMinSize, ArrayNotEmpty, IsArray, IsEmail, IsNotEmpty, IsOptional, IsUUID, MaxLength, MinLength, ValidateNested } from "class-validator";
import { PermissaoDTO } from "src/permissao/dto/Permissao.dto";

export class UsuarioDTO {
    @IsOptional()
    @IsNotEmpty()
    @IsUUID(undefined, { message: 'ID de usuário inválido' })
    id: string;
    
    @IsNotEmpty()
    nome: string;

    @IsEmail(undefined, { message: 'O e-mail informado é inválido' })
    @IsNotEmpty()
    email: string;

    @IsNotEmpty({ message: 'Senha não pode ser vazia' })
    @MaxLength(255, { message: 'Senha não pode ter mais que 255 caracteres' })
    @MinLength(6, { message: 'A senha precisa ter pelo menos 6 caracteres' })
    senha: string;

    @IsOptional()
    @IsNotEmpty({ message: 'Data de criação não pode ser vazia' })
    dataCriacao: Date;

    @IsOptional()
    @IsNotEmpty({ message: 'Data de atualização não pode ser vazia' })
    dataAtualizacao: Date;

    @IsOptional()
    @IsNotEmpty({ message: 'Data de exclusão não pode ser vazia' })
    dataExclusao: Date;

    @IsOptional()
    @IsArray()
    @ArrayNotEmpty()
    @ArrayMinSize(1)
    @ValidateNested()
    @Type(() => PermissaoDTO)
    listaDePermissoes?: PermissaoDTO[]
}