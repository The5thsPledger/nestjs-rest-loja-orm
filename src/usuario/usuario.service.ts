import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ListaUsuarioDTO } from './dto/ListaUsuario.dto';
import { UsuarioEntity } from './usuario.entity';
import { AtualizaUsuarioDTO } from './dto/AtualizaUsuario.dto';
import { UsuarioRepository } from './usuario.repository';
import { CriaUsuarioDTO } from './dto/CriaUsuario.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UsuarioService {
  constructor(
    private readonly usuarioRepository: UsuarioRepository,
  ) {}

  async criaUsuario(dadosDoUsuario: CriaUsuarioDTO) {
    const usuarioEntity = new UsuarioEntity();
    usuarioEntity.email = dadosDoUsuario.email;
    usuarioEntity.senha = dadosDoUsuario.senha;
    usuarioEntity.nome = dadosDoUsuario.nome;
    usuarioEntity.id = uuid();

    try {
      await this.usuarioRepository.salvar(usuarioEntity);
      
      return {
        usuario: new ListaUsuarioDTO(usuarioEntity.id, usuarioEntity.nome),
        messagem: 'usuário criado com sucesso',
      };
    }
    catch(exception) {
      return { 
        mensagem  : 'Erro inesperado ao salvar novo usuário.',
        erro      : exception.message
      }
    }
  }

  async listUsuarios(email: string = null, id: string = null) {
    try {
      const usuarios = await this.usuarioRepository.listar(email, id);
      return usuarios.map((usuario) => new ListaUsuarioDTO(usuario.id, usuario.nome));
    }
    catch (exception) {
      throw exception;
    }
  }

  async atualizaUsuario(id: string, novosDados: AtualizaUsuarioDTO) {
    try {
      await this.listUsuarios(null, id);
    }
    catch (exception) {
      if (exception instanceof NotFoundException) {
        throw new BadRequestException(exception.message);
      }
    }
    await this.usuarioRepository.atualizar(id, novosDados);
  }

  async deletaUsuario(id: string) {
    await this.usuarioRepository.deletar(id);
  }
}
