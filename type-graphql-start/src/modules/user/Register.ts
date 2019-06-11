import * as bcrypt from 'bcryptjs'
import { Arg, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql'

import { User } from '../../entity/User'

@Resolver(User)
export class RegisterResolver {
  @Query(() => String)
  async hello() {
    return 'Hello World!'
  }

  @FieldResolver()
  async name(@Root() parent: User) {
    return `${parent.firstName} ${parent.lastName}`
  }

  @Mutation(() => User)
  async register(
    @Arg('firstName') firstName: string,
    @Arg('lastName') lastName: string,
    @Arg('email') email: string,
    @Arg('password') password: string,
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 12)

    return User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    }).save()
  }
}
