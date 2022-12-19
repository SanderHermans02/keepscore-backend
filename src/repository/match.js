const {
  tables,
  getKnex
} = require('../data/index');

const SELECT_COLUMNS = [
  `${tables.match}.id`, `homeTeamId`, `awayTeamId`, `homeScore`, `awayScore`, `date`,
];

const getById = async (id) => {
  const match = await getKnex()(tables.match)
    // .join(tables.team, `homeTeamId`, `${tables.team}.id`)
    // .join(tables.team, `awayTeamId`, `${tables.team}.id`)
    .where(`${tables.match}.id`, id)
    .first(SELECT_COLUMNS);
  return match;
}

const getAll = async () => {
  const matches = await getKnex()(tables.match)
    // .join(`${tables.team} AS home`, `homeTeamId`, `home.id`)
    // .join(`${tables.team} AS away`, `awayTeamId`, `away.id`)
    .select(SELECT_COLUMNS);
  return matches;
}

const create = async (match) => {
  console.log(match);
  await getKnex()(tables.match)
    .insert(match);
  return match;
}

const deleteById = async (id) => {
  await getKnex()(tables.match)
    .delete()
    .where('id', id);
}


module.exports = {
  getById,
  getAll,
  deleteById,
  create
};