import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator'

import { User } from '../../../entity/User'

@ValidatorConstraint({ async: true })
class IsEmailAlreadyExistConstraint implements ValidatorConstraintInterface {
  async validate(email: string) {
    const user = User.findOne({ where: { email } })
    return !!user
  }
}

export function IsEmailAlreadyExist(options?: ValidationOptions) {
  return (object: object, propertyName: string) => (
    registerDecorator({
      target: object.constructor,
      propertyName,
      options,
      constraints: [],
      validator: IsEmailAlreadyExistConstraint,
    })
  )
}
