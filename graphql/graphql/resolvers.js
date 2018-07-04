const kanziw = {
  name: 'kanziw',
  age: 25,
  gender: 'male',
}
const resolvers = {
  Query: {
    person: () => kanziw,
  },
}

export default resolvers
