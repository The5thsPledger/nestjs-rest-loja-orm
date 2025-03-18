import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { PerfilService } from '../perfil.service';
import { ListaPerfilDTO } from '../dto/ListaPerfil.dto';

@Injectable()
@ValidatorConstraint({ async: true })
export class IsNomeUnicoValidator implements ValidatorConstraintInterface {
  constructor(private perfilService: PerfilService) {}

  async validate(nome: string): Promise<boolean> {
    try {
      if (await this.perfilService.listaPerfis(new ListaPerfilDTO(nome))) {
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
  return (obj: Object, propriedade: string) => {
    registerDecorator({
      target: obj.constructor,
      propertyName: propriedade,
      options: opcoesDeValidacao,
      constraints: [],
      validator: IsNomeUnicoValidator,
    });
  };
};
