const {
  getKnex,
  tables
} = require('../data/index');

const getAll = async () => {
  const teams = await getKnex()(tables.team)
    .select('*')
    .orderBy('name', 'asc');
  return teams;
}

const create = async (team) => {
  const [id] = await getKnex()(tables.team)
    .insert(team);
  return id;
}


const getById = async (id) => {

  const [team] = await getKnex()(tables.team)
    .select('*')
    .where('id', id);
  return team;
}

const deleteById = async (id) => {
  await getKnex()(tables.team)
    .delete()
    .where('id', id);
}


module.exports = {
  getAll,
  create,
  getById,
  deleteById
}