import { IsNotEmpty } from 'class-validator';
import { IsNomeUnico } from '../validacao/is-nome-unico.validator';

export class CriaPerfilDTO {
  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  @IsNomeUnico({ message: 'Já existe um perfil com este nome' })
  nome: string;
}
