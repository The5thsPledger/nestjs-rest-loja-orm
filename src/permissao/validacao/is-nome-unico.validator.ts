import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { PermissaoService } from '../permissao.service';
import { ListarPermissaoDTO } from '../dto/ListarPermissao.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
@ValidatorConstraint({ async: true })
export class IsNomeUnicoValidator implements ValidatorConstraintInterface {
  constructor(private perfilService: PermissaoService) {}

  async validate(nome: string): Promise<boolean> {
    try {
      if (
        await this.perfilService.listarPermissoes(plainToInstance(ListarPermissaoDTO, {nome: nome}))
      ) {
        throw new ConflictException('Perfil ' + nome + ' já está em uso.');
      }
    } catch (exception) {
      if (exception instanceof NotFoundException) {
        return true;
      } else {
        throw exception;
      }
    }
  }
}

export const IsNomeUnico = (opcoesDeValidacao: ValidationOptions) => {
  return (obj: { constructor: any; }, propriedade: string) => {
    registerDecorator({
      target: obj.constructor,
      propertyName: propriedade,
      options: opcoesDeValidacao,
      constraints: [],
      validator: IsNomeUnicoValidator,
    });
  };
};
