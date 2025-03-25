import { IsOptional } from 'class-validator';
import { UsuarioDTO } from './Usuario.dto';

export class ListarUsuarioDTO extends UsuarioDTO{
  @IsOptional()
  nome: string;

  @IsOptional()
  email: string;
}
