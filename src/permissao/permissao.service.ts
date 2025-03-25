import { Injectable } from '@nestjs/common';
import { CriarPermissaoDTO } from './dto/CriarPermissao.dto';
import { PermissaoEntity } from './permissao.entity';
import { ListarPermissaoDTO } from './dto/ListarPermissao.dto';
import { v4 as uuid } from 'uuid';
import { plainToInstance } from 'class-transformer';
import { PermissaoRepository } from './permissao.repository';

@Injectable()
export class PermissaoService {
  constructor(private readonly permissaoRepository: PermissaoRepository) {}

  async criarPermissao(permissao: CriarPermissaoDTO) {
    const permissaoEntity = new PermissaoEntity();
    permissaoEntity.id = uuid();
    permissaoEntity.nome = permissao.nome;

    this.permissaoRepository.criarPermissao(permissaoEntity);

    return {
      permissao: plainToInstance(
        ListarPermissaoDTO, {nome: permissaoEntity.nome, id: permissaoEntity.id}
      ),
      messagem: 'perfil criado com sucesso',
    };
  }

  async listarPermissoes(permissao?: ListarPermissaoDTO) {
    let permissaoEntity: PermissaoEntity;
    if (permissao) {
      permissaoEntity = new PermissaoEntity();
      permissaoEntity.nome = permissao.nome;
      permissaoEntity.id = permissao.id;
    }
    try {
      return (await this.permissaoRepository.listar(permissaoEntity)).map(
        (permissao) => plainToInstance(
          ListarPermissaoDTO, {nome: permissao.nome, id: permissao.id}
        ),
      );
    } catch (exception) {
      throw exception;
    }
  }
}
