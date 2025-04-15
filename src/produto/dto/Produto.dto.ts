import { Type } from "class-transformer";
import { ArrayMinSize, ArrayNotEmpty, IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, MaxLength, Min, ValidateNested } from "class-validator";
import { ProdutoImagemDTO } from "./ProdutoImagem.dto";
import { ProdutoCaracteristicaDTO } from "./ProdutoCaracteristica.dto";
import { FornecedorDTO } from "src/fornecedor/dto/Fornecedor.dto";
import { UsuarioDTO } from "src/usuario/dto/Usuario.dto";

export class ProdutoDTO {
    @IsOptional()
    @IsNotEmpty({ message: 'ID de usuário não pode ser vazio' })
    @IsUUID(undefined, { message: 'ID de usuário inválido' })
    id: string;

    @IsNotEmpty({ message: 'Nome do produto não pode ser vazio' })
    @IsString()
    nome: string;

    @IsNotEmpty({ message: 'Valor do produto não pode ser vazio' })
    @IsNumber({ maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false })
    @Min(0.01, { message: 'O valor precisa ser maior que zero' })
    valor: number;

    @IsNotEmpty({ message: 'Quantidade do produto não pode ser vazia' })
    @IsNumber()
    @Min(1, { message: 'A quantidade precisa ser maior que zero' })
    quantidade: number;

    @IsNotEmpty({ message: 'Descrição do produto não pode ser vazia' })
    @IsString()
    @MaxLength(255, { message: 'Descrição não pode ter mais que 255 caracteres' })
    descricao: string;
    
    @IsNotEmpty({ message: 'Categoria do produto não pode ser vazia' })
    @IsString()
    categoria: string;

    @IsNotEmpty({ message: 'Usuário do produto não pode ser vazio' })
    usuario: UsuarioDTO;
    
    @IsNotEmpty({ message: 'Imagens do produto não podem ser vazias' })
    @IsArray()
    @ArrayNotEmpty({ message: 'O produto precisa ter pelo menos uma imagem' })
    @ArrayMinSize(1, { message: 'O produto precisa ter pelo menos uma imagem' })
    @ValidateNested({ each: true })
    @Type(() => ProdutoImagemDTO)
    imagens: ProdutoImagemDTO[];

    @IsNotEmpty({ message: 'Características do produto não podem ser vazias' })
    @IsArray()
    @ArrayNotEmpty({ message: 'O produto precisa ter pelo menos uma característica' })
    @ArrayMinSize(1, { message: 'O produto precisa ter pelo menos uma característica' })
    @ValidateNested({ each: true })
    @Type(() => ProdutoCaracteristicaDTO)
    caracteristicas: ProdutoCaracteristicaDTO[];

    @IsNotEmpty({ message: 'Fornecedor do produto não pode ser vazio' })
    fornecedor: FornecedorDTO;
}