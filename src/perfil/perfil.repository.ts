import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PerfilEntity } from "./perfil.entity";
import { Repository } from "typeorm";

@Injectable()
export class PerfilRepository {
    constructor(
        @InjectRepository(PerfilEntity)
        private readonly perfilRepository: Repository<PerfilEntity>
    ) {}

    async listar(value: string = null) {
        let where: { nome?: string; };
        if (value) {
            where = { nome : value }
        }
        else {
            where = {}
        }

        return await this.perfilRepository.find({where: where})
    }
    
    async criaPerfil(novoPerfil: PerfilEntity) {
        await this.perfilRepository.save(novoPerfil)
    }
}