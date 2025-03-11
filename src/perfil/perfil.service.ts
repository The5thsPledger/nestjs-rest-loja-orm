import { Injectable } from "@nestjs/common";
import { PerfilRepository } from "./perfil.repository";
import { CriaPerfilDTO } from "./dto/CriaPerfil.dto";
import { UUID } from "typeorm/driver/mongodb/bson.typings";
import { PerfilEntity } from "./perfil.entity";

@Injectable()
export class PerfilService {
    constructor(private readonly perfilRepository : PerfilRepository) {}

    async criaPerfil(dadosPerfil: CriaPerfilDTO) {
        this.perfilRepository.criaPerfil({
            id: new UUID(),
            nome: dadosPerfil.nome
        } as unknown as PerfilEntity)
    }
    
    async listaPerfis(value: string = null) {
        return await this.perfilRepository.listar(value)
    }
}