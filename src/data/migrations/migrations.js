const {
  tables
} = require('..');

exports.up = function (knex) {
  return knex.schema
    .createTable(tables.team, (table) => {
      table.increments('id').primary();
      table.string('name', 255).notNullable();
    })
    .createTable(tables.match, (table) => {
      table.increments('id').primary();
      table.integer('homeTeamId').unsigned().references('id').inTable('teams').onDelete('CASCADE');
      table.integer('awayTeamId').unsigned().references('id').inTable('teams').onDelete('CASCADE');
      table.integer('homeScore').notNullable();
      table.integer('awayScore').notNullable();
      table.date('date').notNullable();
    });
};

exports.down = function (knex) {
  // return knex.schema
  //   .dropTableIfExists(tables.match)
  //   .dropTableIfExists(tables.team);
};