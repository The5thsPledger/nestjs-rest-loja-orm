import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ListarUsuarioDTO } from './dto/ListarUsuario.dto';
import { UsuarioEntity } from './usuario.entity';
import { UsuarioRepository } from './usuario.repository';
import { CriarUsuarioDTO } from './dto/CriarUsuario.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UsuarioService {
  constructor(private readonly usuarioRepository: UsuarioRepository) {}

  async getUsuario(usuario: ListarUsuarioDTO = null) {
    let usuarioEntity = null
    if (usuarioEntity) {
      usuarioEntity = new UsuarioEntity(usuario);
    }

    try {
      return await this.usuarioRepository.listar(usuarioEntity);
    } 
    catch (exception) {
      throw exception;
    }
  }

  async criarUsuario(dadosDoUsuario: CriarUsuarioDTO) {
    const usuarioEntity = new UsuarioEntity(dadosDoUsuario);

    try {
      await this.usuarioRepository.salvar(usuarioEntity);

      return {
        usuario: plainToInstance(ListarUsuarioDTO, {id: usuarioEntity.id, nome: usuarioEntity.nome}),
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
        (usuario) => plainToInstance(ListarUsuarioDTO, usuario)
      );
    } catch (exception) {
      throw exception;
    }
  }

  async atualizarUsuario(id: string, novosDados: Partial<CriarUsuarioDTO>) {
    try {
      await this.listarUsuarios(plainToInstance(ListarUsuarioDTO, {id: id}));
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
      await this.listarUsuarios(plainToInstance(ListarUsuarioDTO, {id: id}));
    } catch (exception) {
      if (exception instanceof NotFoundException) {
        throw new BadRequestException(exception.message);
      }
    }
    await this.usuarioRepository.deletar(id);
  }

  // async permissaoUsuario(permissaoUsuario: PermissaoUsuarioDTO) {
  //   const perfis = await this.perfilService.listarPermissoes(
  //     plainToInstance(ListarPermissaoDTO, {perfilID: permissaoUsuario.permissaoID})
  //   );
  //   const usuario: UsuarioEntity = (
  //     await this.getUsuario(plainToInstance(ListarUsuarioDTO, {usuarioID: permissaoUsuario.usuarioID})))[0];

  //   if (usuario.permissoes.length > 0) {
  //     const permissao = usuario.permissoes.find(
  //       (permissao) => permissao.id == permissaoUsuario.permissaoID,
  //     );

  //     this.usuarioRepository.revogarPermissao(usuario, permissao);
  //     return {
  //       mensagem:
  //         'Permissão ' + permissao.nome + ' revogada do usuário ' + usuario.nome,
  //     };
  //   } else {
  //     const permissao = new PermissaoEntity();
  //     permissao.id = perfis[0].id;
  //     permissao.nome = perfis[0].nome;

  //     this.usuarioRepository.concederPermissao(usuario, permissao);

  //     return {
  //       mensagem:
  //         'Permissão ' + permissao.nome + ' concedida ao usuário ' + usuario.nome,
  //     };
  //   }
  // }
}
