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
import { UsuarioService } from '../usuario.service';
import { ListarUsuarioDTO } from '../dto/ListarUsuario.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
@ValidatorConstraint({ async: true })
export class EmailEhUnicoValidator implements ValidatorConstraintInterface {
  constructor(private usuarioService: UsuarioService) {}

  async validate(email: any): Promise<boolean> {
    try {
      const usuarioComEmailExiste = await this.usuarioService.listarUsuarios(
        plainToInstance(ListarUsuarioDTO, { email: email })
      );
      if (usuarioComEmailExiste) {
        throw new ConflictException('Email ' + email + ' já está em uso.');
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

export const EmailEhUnico = (opcoesDeValidacao: ValidationOptions) => {
  return (objeto: { constructor: any }, propriedade: string) => {
    registerDecorator({
      target: objeto.constructor,
      propertyName: propriedade,
      options: opcoesDeValidacao,
      constraints: [],
      validator: EmailEhUnicoValidator,
    });
  };
};
