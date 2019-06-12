import { Field, ID, ObjectType } from 'type-graphql'
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number

  @Field()
  @Column()
  firstName: string

  @Field()
  @Column()
  lastName: string

  @Field()
  @Column({ unique: true })
  email: string

  @Field()
  get name(): string {
    return `${this.firstName} ${this.lastName}`
  }

  @Column()
  password: string

  @Column('bool', { default: false })
  confirmed: boolean
}
