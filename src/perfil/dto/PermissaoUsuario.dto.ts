import { IsNotEmpty, IsUUID } from 'class-validator';

export class PermissaoUsuarioDTO {
  @IsNotEmpty()
  @IsUUID(undefined, { message: 'ID do perfil inválido' })
  perfilID: string;

  @IsNotEmpty()
  @IsUUID(undefined, { message: 'ID de usuário inválido' })
  usuarioID: string;
}
