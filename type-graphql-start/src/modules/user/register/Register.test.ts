import faker from 'faker'

import { User } from '../../../entity/User'
import { gCall } from '../../../test-utils/gCall'
import { closeConn, testConn } from '../../../test-utils/testConn'

beforeAll(() => testConn())
afterAll(closeConn)

const registerMutation = `
mutation Register($data: RegisterInput!) {
  register(
    data: $data
  ) {
    id
    firstName
    lastName
    email
    name
  }
}
`

describe('Register', () => {
  it('create user', async () => {
    jest.setTimeout(30000)

    const user = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    }

    const response = await gCall({
      source: registerMutation,
      variableValues: {
        data: user,
      },
    })

    await expect(response).toMatchObject({
      data: {
        register: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        },
      },
    })

    const dbUser = await User.findOne({ where: { email: user.email } })
    expect(dbUser).toBeDefined()
    expect(dbUser!.confirmed).toBeFalsy()
    expect(dbUser!.firstName).toBe(user.firstName)
  })
})
