import { Type } from "class-transformer";
import { 
    ArrayMinSize, ArrayNotEmpty, IsArray, IsEmail, IsNotEmpty, IsOptional, 
    IsString, IsUUID, MaxLength, ValidateNested 
} from "class-validator";
import { PermissaoDTO } from "src/permissao/dto/Permissao.dto";

export class UsuarioDTO {
    @IsOptional()
    @IsNotEmpty()
    @IsUUID(undefined, { message: 'ID de usuário inválido' })
    id: string;
    
    @IsNotEmpty()
    @IsString()
    @MaxLength(100, { message: 'Nome não pode ter mais que 100 caracteres' })
    nome: string;

    @IsNotEmpty()
    @MaxLength(70, { message: 'E-mail não pode ter mais que 70 caracteres' })
    @IsEmail(undefined, { message: 'O e-mail informado é inválido' })
    email: string;

    @IsNotEmpty()
    @IsArray()
    @ArrayNotEmpty()
    @ArrayMinSize(1)
    @ValidateNested()
    @Type(() => PermissaoDTO)
    permissoes = new Array<PermissaoDTO>();
}