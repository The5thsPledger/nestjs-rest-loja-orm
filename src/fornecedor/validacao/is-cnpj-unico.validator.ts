import { Injectable } from "@nestjs/common";
import { ConflictException, NotFoundException } from "@nestjs/common";
import { 
    registerDecorator, 
    ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface 
} from "class-validator";
import { plainToInstance } from "class-transformer";
import { FornecedorDTO } from "../dto/Fornecedor.dto";
import { FornecedorService } from "../fornecedor.service";

@Injectable()
@ValidatorConstraint({ async: true })
export class IsCnpjUnicoValidator implements ValidatorConstraintInterface {
  constructor(private fornecedorService: FornecedorService) {}

  async validate(cnpj: number): Promise<boolean> {
    try {
      if (await this.fornecedorService.listarFornecedores(plainToInstance(FornecedorDTO, {cnpj: cnpj}))) {
        throw new ConflictException('CNPJ ' + cnpj + ' já está em uso.');
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
export const CNPJEhUnico = (validationOptions: ValidationOptions) => {
  return (object: { constructor: any; }, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsCnpjUnicoValidator,
    });
  };
}