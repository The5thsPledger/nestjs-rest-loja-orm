import { IsOptional } from 'class-validator';
import { EmailEhUnico } from '../validacao/email-eh-unico.validator';
import { UsuarioDTO } from './Usuario.dto';

export class AtualizarUsuarioDTO extends UsuarioDTO {
  @IsOptional()
  nome: string;

  @EmailEhUnico({ message: 'Já existe um usuário com este e-mail' })
  @IsOptional()
  email: string;

  @IsOptional()
  senha: string;
}
