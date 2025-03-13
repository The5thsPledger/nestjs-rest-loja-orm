import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PerfilEntity } from "./perfil.entity";
import { Repository } from "typeorm";

@Injectable()
export class PerfilRepository {
    constructor(
        @InjectRepository(PerfilEntity)
        private readonly perfilRepository: Repository<PerfilEntity>
    ) {}

    async listar(perfil?: PerfilEntity) {
        let perfis  = new Array<PerfilEntity>();
        const msg   = new Array<string>();

        if (perfil) {
            if (perfil.nome) {
                msg.push(" com o nome " + perfil.nome);
            }
            if (perfil.id) {
                msg.push(" com o ID " + perfil.id);
            }
            
            perfis.push(await this.perfilRepository.findOne({ where: {
                nome: perfil.nome,
                id  : perfil.id
            }}))
        }
        else {
            perfis = await this.perfilRepository.find();
        }

        if (perfis[0]) {
            return perfis
        }
        else {
            throw new NotFoundException("Não encontrado nenhum perfil" + msg + ".");
        }
    }
    
    async criaPerfil(novoPerfil: PerfilEntity) {
        await this.perfilRepository.save(novoPerfil)
    }
}