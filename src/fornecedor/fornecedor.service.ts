import { Injectable } from "@nestjs/common";
import { FornecedorRepository } from "./fornecedor.repository";
import { FornecedorDTO } from "./dto/Fornecedor.dto";
import { FornecedorEntity } from "./fornecedor.entity";

@Injectable()
export class FornecedorService {
    constructor(private fornecedorRepository: FornecedorRepository) {}

    async listarFornecedores(fornecedor: FornecedorDTO = null) {
        return await this.fornecedorRepository.listarFornecedores(
            new FornecedorEntity(fornecedor)
        );
    }
}