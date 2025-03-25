import { IsOptional } from 'class-validator';
import { IsNomeUnico } from '../validacao/is-nome-unico.validator';
import { PermissaoDTO } from './Permissao.dto';

export class CriarPermissaoDTO extends PermissaoDTO {
  @IsOptional()
  id?: string;
  
  @IsNomeUnico({ message: 'Já existe um perfil com este nome' })
  nome: string;
}
