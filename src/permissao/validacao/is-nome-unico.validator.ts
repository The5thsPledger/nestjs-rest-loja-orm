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
import { plainToInstance } from 'class-transformer';
import { PermissaoDTO } from '../dto/Permissao.dto';

@Injectable()
@ValidatorConstraint({ async: true })
export class IsNomeUnicoValidator implements ValidatorConstraintInterface {
  constructor(private perfilService: PermissaoService) {}

  async validate(nome: string): Promise<boolean> {
    try {
      if (
        await this.perfilService.listarPermissoes(plainToInstance(PermissaoDTO, {nome: nome}))
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
