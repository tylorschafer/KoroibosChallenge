// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/koroibos_dev',
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/dev'
    },
    useNullAsDefault: true
  },
  test: {
    client: 'pg',
    connection: 'postgres://localhost/koroibos_test',
    migrations: {
      directory: './db/migrations'
    },
    useNullAsDefault: true
  },
  production: {
    client: 'pg',
    connection: '',
    migrations: {
      directory: './db/migrations'
    },
    useNullAsDefault: true
  }
};
