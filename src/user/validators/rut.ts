import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import {validateRut} from '../../common/rut';
@ValidatorConstraint({ name: 'isRut', async: false })
export class IsRut implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    return validateRut(text);
   // return text.length > 1 && text.length < 10; // for async validations you must return a Promise<boolean> here
  }

  defaultMessage(args: ValidationArguments) {
    // here you can provide default error message if validation failed
    return 'RUT ($value) no es válido';
  }
}