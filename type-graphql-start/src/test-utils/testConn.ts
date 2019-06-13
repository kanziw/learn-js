import { createConnection } from 'typeorm'

export const testConn = (drop: boolean = false) => {
  return createConnection({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'typegraphql-example-test',
    synchronize: drop,
    dropSchema: drop,
    entities: [ __dirname + '/../entity/*.*' ],
  })
}
