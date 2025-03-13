import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UsuarioEntity } from "./usuario.entity";
import { Repository } from "typeorm";
import { PerfilEntity } from "src/perfil/perfil.entity";

@Injectable()
export class UsuarioRepository {
    constructor(
        @InjectRepository(UsuarioEntity)
        private readonly usuarioRepository: Repository<UsuarioEntity>
    ) {}
    
    async salvar(usuarioEntity: UsuarioEntity) {
        await this.usuarioRepository.save(usuarioEntity);
    }
    
    async listar(usuarioEntity?: UsuarioEntity) {
        let usuario = new Array<UsuarioEntity>();
        const msg   = new Array<string>();
        if (usuarioEntity) {
            if (usuarioEntity.id) {
                msg.push(' com o id ' + usuarioEntity.id);
            }
            if (usuarioEntity.email) {
                msg.push(' com o email ' + usuarioEntity.email);
            }

            usuario.push(await this.usuarioRepository.findOne({ 
                where: {
                    email : usuarioEntity.email,
                    id    : usuarioEntity.id
                },
            }));
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
    
    async atualizar(novosDados: UsuarioEntity) {
        await this.usuarioRepository.update(novosDados.id, novosDados);
    }

    async deletar(id: string) {
        await this.usuarioRepository.delete(id);
    }
    
    async revogarPermissao(usuario: UsuarioEntity, perfil: PerfilEntity) {
        usuario.perfis = usuario.perfis.filter((perfilUsuario) => perfilUsuario.id != perfil.id);
        this.usuarioRepository.save(usuario);
    }

    async concederPermissao(usuario: UsuarioEntity, perfil: PerfilEntity) {
        usuario.perfis.push(perfil)
        this.usuarioRepository.save(usuario)
    }
}