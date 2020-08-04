import knex from 'knex'; //query builder +-ORM
import path from 'path';

const db = knex({
  client: 'sqlite3',
  connection: {
    filename: path.resolve(__dirname, 'database.sqlite')
  },
  useNullAsDefault: true //null on empty content
});

export default db;