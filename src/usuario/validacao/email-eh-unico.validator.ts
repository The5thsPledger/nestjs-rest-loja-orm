import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UsuarioService } from '../usuario.service';

@Injectable()
@ValidatorConstraint({ async: true })
export class EmailEhUnicoValidator implements ValidatorConstraintInterface {
  constructor(private usuarioService: UsuarioService) {}

  async validate(
    value: any,
    _validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    try {
      const usuarioComEmailExiste = await this.usuarioService.listUsuarios(value);
      if (usuarioComEmailExiste) {
        throw new BadRequestException('Email ' + value + ' já está em uso.');
      }
      else {
        return !usuarioComEmailExiste;
      }
    }
    catch (exception) {
      if (exception instanceof NotFoundException) {
        return true;
      }
      else {
        throw exception;
      }
    }
  }
}

export const EmailEhUnico = (opcoesDeValidacao: ValidationOptions) => {
  return (objeto: Object, propriedade: string) => {
    registerDecorator({
      target: objeto.constructor,
      propertyName: propriedade,
      options: opcoesDeValidacao,
      constraints: [],
      validator: EmailEhUnicoValidator,
    });
  };
};
