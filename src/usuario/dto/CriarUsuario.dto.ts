import { EmailEhUnico } from '../validacao/email-eh-unico.validator';
import { UsuarioDTO } from './Usuario.dto';

export class CriarUsuarioDTO extends UsuarioDTO {
  @EmailEhUnico({ message: 'Já existe um usuário com este e-mail' })
  email: string;
}
