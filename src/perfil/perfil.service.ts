import { Injectable } from "@nestjs/common";
import { PerfilRepository } from "./perfil.repository";
import { CriaPerfilDTO } from "./dto/CriaPerfil.dto";
import { PerfilEntity } from "./perfil.entity";
import { ListaPerfilDTO } from "./dto/ListaPerfil.dto";
import { v4 as uuid } from 'uuid';

@Injectable()
export class PerfilService {
    constructor(private readonly perfilRepository : PerfilRepository) {}

    async criaPerfil(dadosPerfil: CriaPerfilDTO) {
        const perfilEntity  = new PerfilEntity();
        perfilEntity.id     = uuid();
        perfilEntity.nome   = dadosPerfil.nome

        this.perfilRepository.criaPerfil(perfilEntity)
        
        return {
        perfil: new ListaPerfilDTO(perfilEntity.nome, perfilEntity.id),
        messagem: "perfil criado com sucesso",
        };
    }
    
    async listaPerfis(perfil?: ListaPerfilDTO) {
        let perfilEntity: PerfilEntity;
        if (perfil) {
            perfilEntity = new PerfilEntity();
            perfilEntity.nome   = perfil.nome;
            perfilEntity.id     = perfil.id;
        }
        try{
            return (
                await this.perfilRepository.listar(perfilEntity)
            ).map((perfil) => new ListaPerfilDTO(perfil.nome, perfil.id))
        }
        catch (exception) {
            throw exception;
        }
    }
}