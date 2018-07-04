import { GraphQLServer } from 'graphql-yoga'

const server = GraphQLServer({})
server.start(() => console.log('GraphQL Server Running!'))
