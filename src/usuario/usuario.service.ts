import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ListarUsuarioDTO } from './dto/ListarUsuario.dto';
import { UsuarioEntity } from './usuario.entity';
import { AtualizaUsuarioDTO } from './dto/AtualizaUsuario.dto';
import { UsuarioRepository } from './usuario.repository';
import { CriaUsuarioDTO } from './dto/CriaUsuario.dto';
import { PermissaoUsuarioDTO } from 'src/perfil/dto/PermissaoUsuario.dto';
import { PerfilService } from 'src/perfil/perfil.service';
import { PerfilEntity } from 'src/perfil/perfil.entity';
import { ListaPerfilDTO } from 'src/perfil/dto/ListaPerfil.dto';

@Injectable()
export class UsuarioService {
  constructor(
    private readonly usuarioRepository: UsuarioRepository,
    private readonly perfilService: PerfilService,
  ) {}

  async getUsuario(usuario: ListarUsuarioDTO = null) {
    const usuarioEntity = new UsuarioEntity(usuario);
    try {
      return await this.usuarioRepository.listar(usuarioEntity);
    } 
    catch (exception) {
      throw exception;
    }
  }

  async criarUsuario(dadosDoUsuario: CriaUsuarioDTO) {
    const usuarioEntity = new UsuarioEntity(dadosDoUsuario);

    try {
      await this.usuarioRepository.salvar(usuarioEntity);

      return {
        usuario: new ListarUsuarioDTO(usuarioEntity.id, usuarioEntity.nome),
        messagem: 'usuário criado com sucesso',
      };
    } catch (exception) {
      return {
        mensagem: 'Erro inesperado ao salvar novo usuário.',
        erro: (exception as Error).message,
      };
    }
  }

  async listarUsuarios(usuario?: ListarUsuarioDTO) {
    try {
      return (await this.getUsuario(usuario)).map(
        (usuario) =>
          new ListarUsuarioDTO(
            usuario.id,
            usuario.nome,
            usuario.email,
            usuario.perfis,
          ),
      );
    } catch (exception) {
      throw exception;
    }
  }

  async atualizaUsuario(id: string, novosDados: AtualizaUsuarioDTO) {
    try {
      await this.listarUsuarios(new ListarUsuarioDTO(id));
    } catch (exception) {
      if (exception instanceof NotFoundException) {
        throw new BadRequestException(exception.message);
      }
    }
    const usuarioEntity = new UsuarioEntity();
    usuarioEntity.id = id;
    usuarioEntity.nome = novosDados.nome;
    usuarioEntity.email = novosDados.email;
    usuarioEntity.senha = novosDados.senha;

    await this.usuarioRepository.atualizar(usuarioEntity);
  }

  async deletaUsuario(id: string) {
    try {
      await this.listarUsuarios(new ListarUsuarioDTO(id));
    } catch (exception) {
      if (exception instanceof NotFoundException) {
        throw new BadRequestException(exception.message);
      }
    }
    await this.usuarioRepository.deletar(id);
  }

  async permissaoUsuario(permissaoUsuario: PermissaoUsuarioDTO) {
    const perfis = await this.perfilService.listaPerfis(
      new ListaPerfilDTO(null, permissaoUsuario.perfilID),
    );
    const usuario: UsuarioEntity = (
      await this.getUsuario(new ListarUsuarioDTO(permissaoUsuario.usuarioID))
    )[0];

    if (usuario.perfis.length > 0) {
      const perfil = usuario.perfis.find(
        (perfil) => perfil.id == permissaoUsuario.perfilID,
      );

      this.usuarioRepository.revogarPermissao(usuario, perfil);
      return {
        mensagem:
          'Perfil ' + perfil.nome + ' revogado do usuário ' + usuario.nome,
      };
    } else {
      const perfil = new PerfilEntity();
      perfil.id = perfis[0].id;
      perfil.nome = perfis[0].nome;

      this.usuarioRepository.concederPermissao(usuario, perfil);

      return {
        mensagem:
          'Perfil ' + perfil.nome + ' concedido ao usuário ' + usuario.nome,
      };
    }
  }
}
