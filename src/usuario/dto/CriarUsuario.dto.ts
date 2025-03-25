import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { EmailEhUnico } from '../validacao/email-eh-unico.validator';
import { UsuarioDTO } from './Usuario.dto';

export class CriarUsuarioDTO extends UsuarioDTO {
  @EmailEhUnico({ message: 'Já existe um usuário com este e-mail' })
  email: string;

  @IsNotEmpty({ message: 'A senha não pode ser vazia' })
  @MinLength(6, { message: 'A senha precisa ter pelo menos 6 caracteres' })
  @MaxLength(255, { message: 'A senha não pode ter mais que 255 caracteres' })
  senha: string;
}
