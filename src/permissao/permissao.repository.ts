import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PermissaoEntity } from './permissao.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PermissaoRepository {
  constructor(
    @InjectRepository(PermissaoEntity)
    private readonly permissaoRepository: Repository<PermissaoEntity>,
  ) {}

  async listar(permissao?: PermissaoEntity) {
    let perfis = new Array<PermissaoEntity>();
    const msg = new Array<string>();

    if (permissao) {
      if (permissao.nome) {
        msg.push(' com o nome ' + permissao.nome);
      }
      if (permissao.id) {
        msg.push(' com o ID ' + permissao.id);
      }

      perfis.push(
        await this.permissaoRepository.findOne({
          where: {
            nome: permissao.nome,
            id: permissao.id,
          },
        }),
      );
    } else {
      perfis = await this.permissaoRepository.find();
    }

    if (perfis[0]) {
      return perfis;
    } else {
      throw new NotFoundException('Não encontrada nenhuma permissão' + msg + '.');
    }
  }

  async criarPermissao(permissao: PermissaoEntity) {
    await this.permissaoRepository.save(permissao);
  }
}
