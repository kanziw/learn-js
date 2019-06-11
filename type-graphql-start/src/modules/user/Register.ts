import bcrypt from 'bcryptjs'
import { Arg, Mutation, Query, Resolver } from 'type-graphql'

import { User } from '../../entity/User'
import { RegisterInput } from './register/RegisterInput'

@Resolver(User)
export class RegisterResolver {
  @Query(() => String)
  async hello() {
    return 'Hello World!'
  }

  @Mutation(() => User)
  async register(@Arg('data') {
    email,
    firstName,
    lastName,
    password,
  }: RegisterInput): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 12)

    return User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    }).save()
  }
}
