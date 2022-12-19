const {
  getLogger
} = require('../core/logging');
const teamsRepository = require('../repository/team');

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getLogger();
  this.logger.debug(message, meta);
};

const getAll = async () => {
  debugLog('Fetching all teams');
  const teams = await teamsRepository.getAll();
  return {
    items: teams,
    count: teams.length
  };
};

const getById = (id) => {
  debugLog(`Fetching teams with id ${id}`);
  return teamsRepository.getById(id);
};

const create = async ({
  name
}) => {

  const newTeam = {
    name
  };
  debugLog('Creating new team', newTeam);
  let teams = await teamsRepository.getAll();
  if (teams.find(team => team.name === name)) {
    debugLog(`Team with name ${name} already exists`);
    return null;
  }
  teamsRepository.create(newTeam);
  return newTeam;
};

const updateById = (id, {
  name
}) => {
  debugLog(`Updating team with id ${id} with name ${name}`);
  const team = teamsRepository.getById(id);
  if (!team) {
    debugLog(`Team with id ${id} not found`);
    return null;
  }
  team.name = name;
  return teamsRepository.updateById(id, team);
};

const deleteById = (id) => {
  debugLog(`Deleting team with id ${id}`);
  teamsRepository.deleteById(id);
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById
};