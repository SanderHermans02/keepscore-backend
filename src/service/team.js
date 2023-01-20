const {
  getLogger
} = require('../core/logging');
const teamsRepository = require('../repository/team');

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getLogger();
  this.logger.debug(message, meta);
};

const getAll = async (
  user
) => {
  debugLog('Fetching all teams');
  const teams = await teamsRepository.getAll();
  let filteredTeams = teams.filter(team => team.userId === user.id);
  return {
    items: filteredTeams,
    count: filteredTeams.length
  };
};

const getById = (id) => {
  debugLog(`Fetching teams with id ${id}`);
  return teamsRepository.getById(id);
};

const create = async ({
  name,
  userId
}) => {

  const newTeam = {
    userId,
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

const deleteById = (id) => {
  debugLog(`Deleting team with id ${id}`);
  teamsRepository.deleteById(id);
};

module.exports = {
  getAll,
  getById,
  create,
  deleteById
};