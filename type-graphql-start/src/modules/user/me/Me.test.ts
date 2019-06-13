import faker from 'faker'

import { User } from '../../../entity/User'
import { gCall } from '../../../test-utils/gCall'
import { closeConn, testConn } from '../../../test-utils/testConn'

beforeAll(() => testConn())
afterAll(closeConn)

const meQuery = `
 {
  me {
    id
    firstName
    lastName
    email
    name
  }
}
`

describe('Me', () => {
  it('get user', async () => {
    const user = await User.create({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    }).save()

    const response = await gCall({
      source: meQuery,
      userId: user.id,
    })

    await expect(response).toMatchObject({
      data: {
        me: {
          id: `${user.id}`,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        },
      },
    })
  })

  it('return null', async () => {
    const response = await gCall({
      source: meQuery,
    })

    await expect(response).toMatchObject({
      data: {
        me: null,
      },
    })
  })
})
