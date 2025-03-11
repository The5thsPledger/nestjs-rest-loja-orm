import { ConflictException, Injectable } from "@nestjs/common";
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { PerfilService } from "../perfil.service";

@Injectable()
@ValidatorConstraint({ async: true })
export class IsNomeUnicoValidator implements ValidatorConstraintInterface {
    constructor(private perfilService: PerfilService) {}

    async validate(value: string, validationArguments?: ValidationArguments): Promise<boolean> {
        if (await this.perfilService.listaPerfis(value)) {
            throw new ConflictException('Perfil ' + value + ' já está em uso.');
        }
        else {
            return true
        };
    }
}

export const IsNomeUnico = (opcoesDeValidacao: ValidationOptions) => {
    return (obj: Object, propriedade: string) => {
        registerDecorator({
            target: obj.constructor,
            propertyName: propriedade,
            options: opcoesDeValidacao,
            constraints: [],
            validator: IsNomeUnicoValidator
        })
    }
}