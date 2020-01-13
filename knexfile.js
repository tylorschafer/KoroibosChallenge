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
    connection: 'postgres://oovvzpmkswoocn:0666787a811668b26b6df084ad86ed1781a0a9e76e1d87035bf7c7aa04a275a5@ec2-54-163-234-44.compute-1.amazonaws.com:5432/dafqk8m52hed9r',
    migrations: {
      directory: './db/migrations'
    },
    useNullAsDefault: true
  }
};
