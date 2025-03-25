import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, MaxLength, Min } from "class-validator";

export class ProdutoDTO {
    @IsOptional()
    @IsNotEmpty({ message: 'ID de usuário não pode ser vazio' })
    @IsUUID(undefined, { message: 'ID de usuário inválido' })
    id?: string;

    @IsNotEmpty({ message: 'Nome do produto não pode ser vazio' })
    @IsString()
    nome?: string;

    @IsNotEmpty({ message: 'Valor do produto não pode ser vazio' })
    @IsNumber({ maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false })
    @Min(0.01, { message: 'O valor precisa ser maior que zero' })
    valor?: number;

    @IsNotEmpty({ message: 'Quantidade do produto não pode ser vazia' })
    @IsNumber()
    @Min(1, { message: 'A quantidade precisa ser maior que zero' })
    quantidade?: number;

    @IsNotEmpty({ message: 'Descrição do produto não pode ser vazia' })
    @IsString()
    @MaxLength(255, { message: 'Descrição não pode ter mais que 255 caracteres' })
    descricao?: string;
    
    @IsNotEmpty({ message: 'Categoria do produto não pode ser vazia' })
    @IsString()
    categoria?: string;
}