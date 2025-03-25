import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsUUID, MaxLength } from "class-validator";

export class FornecedorDTO {
    @IsOptional()
    @IsNotEmpty()
    @IsUUID(undefined, { message: 'ID de fornecedor inválido' })
    id: string
    
    @IsNotEmpty()
    @MaxLength(100)
    nome: string;

    @IsNotEmpty()
    @IsNumber()
    cnpj: number;

    endereco: string;
    telefone: number;

    @IsNotEmpty()
    @IsEmail()
    email: string;
}