import { IsOptional } from "class-validator"
import { PermissaoDTO } from "./Permissao.dto";

export class ListarPermissaoDTO extends PermissaoDTO {
  @IsOptional()
  nome?: string;

  @IsOptional()
  id?: string;
}
