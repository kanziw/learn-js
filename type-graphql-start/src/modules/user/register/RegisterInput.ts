import { IsEmail, Length } from 'class-validator'
import { Field, InputType } from 'type-graphql'

import Empty from '../../shared/Empty'
import { PasswordMixin } from '../../shared/PasswordInput'
import { IsEmailAlreadyExist } from './isEmailAlreadyExist'

@InputType()
export class RegisterInput extends PasswordMixin(Empty) {
  @Field()
  @Length(1, 255)
  firstName: string

  @Field()
  @Length(1, 255)
  lastName: string

  @Field()
  @IsEmail()
  @IsEmailAlreadyExist({ message: 'email already in use' })
  email: string
}
