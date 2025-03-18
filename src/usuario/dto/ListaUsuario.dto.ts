import { ListaPerfilDTO } from 'src/perfil/dto/ListaPerfil.dto';

export class ListaUsuarioDTO {
  constructor(
    readonly id?: string,
    readonly nome?: string,
    readonly email?: string,
    readonly permissoes?: ListaPerfilDTO[],
  ) {}
}
