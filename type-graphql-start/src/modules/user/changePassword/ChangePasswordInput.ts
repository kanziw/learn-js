import { Field, InputType } from 'type-graphql'

import Empty from '../../shared/Empty'
import { PasswordMixin } from '../../shared/PasswordInput'

@InputType()
export class ChangePasswordInput extends PasswordMixin(Empty) {
  @Field()
  token: string
}
