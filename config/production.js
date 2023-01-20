module.exports = {
  log: {
    level: 'info',
    disabled: false,
  },
  cors: {
    origins: ['https://frontendweb-keepscore.onrender.com'],
    maxAge: 3 * 60 * 60, // 3h in seconds
  },
  database: {
    client: 'mysql2',
    host: 'vichogent.be',
    port: 40043,
    name: '073918sh',
  },
  port: 9000,
};