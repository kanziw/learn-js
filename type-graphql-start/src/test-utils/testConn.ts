import { Connection, createConnection } from 'typeorm'

let conn: Connection
let refCnt = 0

export const testConn = async (drop: boolean = false) => {
  conn = await createConnection({
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
  refCnt += 1
  return conn
}

export const closeConn = async () => {
  if (refCnt > 0) {
    refCnt -= 1
    return
  }
  if (refCnt === 0) {
    return conn && conn.close()
  }

  throw Error(`Unexpected DB conn ${{ refCnt }}`)
}
