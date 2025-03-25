import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { FornecedorEntity } from "./fornecedor.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class FornecedorRepository {
    constructor(
        @InjectRepository(FornecedorEntity)
        private readonly fornecedorRepository: Repository<FornecedorEntity>
    ) {}
    
    async listarFornecedores(fornecedor: FornecedorEntity = null) {
        let fornecedores = new Array<FornecedorEntity>();
        const msg = new Array<string>();
        if (fornecedor) {
            if (fornecedor.id) {
                fornecedores.push(
                    await this.fornecedorRepository.findOneBy({ id: fornecedor.id }),
                );
        
                msg.push(' com o id ' + fornecedor.id);
            }
        }
        else {
            fornecedores = await this.fornecedorRepository.find();
        }
        
        if (fornecedores[0]) {
            return fornecedores;
        }
        else {
            throw new NotFoundException('Não encontrado nenhum fornecedor' + msg + '.');
        }
    }
}