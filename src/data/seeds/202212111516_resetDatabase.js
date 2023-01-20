const {
  tables
} = require('..');

module.exports = {
  seed: async (knex) => {
    await knex(tables.match).delete();
    await knex(tables.team).delete();
  },
};