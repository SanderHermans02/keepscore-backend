module.exports = {
  log: {
    level: 'silly',
    disabled: false,
  },
  cors: {
    origins: ['http://127.0.0.1:3000'],
    maxAge: 3 * 60 * 60,
    credentials: true
  },
  database: {
    client: 'mysql2',
    host: 'localhost',
    port: 3306,
    name: '073918sh',
  },
  port: 9000,
};