import { IsNomeUnico } from '../validacao/is-nome-unico.validator';
import { PermissaoDTO } from './Permissao.dto';

export class CriarPermissaoDTO extends PermissaoDTO {
  @IsNomeUnico({ message: 'Já existe um perfil com este nome' })
  nome: string;
}
