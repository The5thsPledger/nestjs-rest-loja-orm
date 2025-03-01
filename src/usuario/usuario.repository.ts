import { Injectable, NotFoundException, PreconditionFailedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UsuarioEntity } from "./usuario.entity";
import { QueryFailedError, Repository } from "typeorm";
import { AtualizaUsuarioDTO } from "./dto/AtualizaUsuario.dto";

@Injectable()
export class UsuarioRepository {
    constructor(
        @InjectRepository(UsuarioEntity)
        private readonly usuarioRepository: Repository<UsuarioEntity>,
    ) {}
    
    async salvar(usuarioEntity: UsuarioEntity) {
        await this.usuarioRepository.save(usuarioEntity);
    }
    
    async listar(email: string = null, id: string = null) {
        let usuario = new Array<UsuarioEntity>();
        const msg   = new Array<string>();
        if (email || id) {
            if (email) {
                msg.push(' com o email ' + email);
            }
            if (id) {
                msg.push(' com o id ' + id);
            }

            usuario.push(await this.usuarioRepository.findOne({ where: {
                email : email,
                id    : id
            }}));
        }
        else {
            usuario = await this.usuarioRepository.find();
        }

        if (usuario[0]) {
            return usuario
        }
        else {
            throw new NotFoundException('Não encontrado nenhum usuário' + msg + '.')
        }
    }
    
    async atualizar(id: string, novosDados: AtualizaUsuarioDTO) {
        await this.usuarioRepository.update(id, novosDados);
    }

    async deletar(id: string) {
        await this.usuarioRepository.delete(id);
    }
}