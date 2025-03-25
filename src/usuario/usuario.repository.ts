import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioEntity } from './usuario.entity';
import { Repository } from 'typeorm';
import { PermissaoEntity } from 'src/permissao/permissao.entity';

@Injectable()
export class UsuarioRepository {
  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
  ) {}

  async salvar(usuarioEntity: UsuarioEntity) {
    await this.usuarioRepository.save(usuarioEntity);
  }

  async listar(usuarioEntity?: UsuarioEntity) {
    let usuarios = new Array<UsuarioEntity>();
    const msg = new Array<string>();
    if (usuarioEntity) {
      if (usuarioEntity.id) {
        msg.push(' com o id ' + usuarioEntity.id);
      }
      if (usuarioEntity.email) {
        msg.push(' com o email ' + usuarioEntity.email);
      }

      usuarios.push(
        await this.usuarioRepository.findOneBy(usuarioEntity),
      );
    } 
    else {
      usuarios = await this.usuarioRepository.find();
    }

    if (usuarios[0]) {
      return usuarios
    } 
    else {
      throw new NotFoundException('Não encontrado nenhum usuário' + msg + '.');
    }
  }

  async atualizar(novosDados: UsuarioEntity) {
    await this.usuarioRepository.update(novosDados.id, novosDados);
  }

  async deletar(id: string) {
    await this.usuarioRepository.delete(id);
  }

  async revogarPermissao(usuarios: UsuarioEntity, permissao: PermissaoEntity) {
    usuarios.permissoes = usuarios.permissoes.filter(
      (permissaoUsuario) => permissaoUsuario.id != permissao.id,
    );
    this.usuarioRepository.save(usuarios);
  }

  async concederPermissao(usuarios: UsuarioEntity, permissao: PermissaoEntity) {
    usuarios.permissoes.push(permissao);
    this.usuarioRepository.save(usuarios);
  }
}
