const {
  getLogger
} = require('../core/logging');
const matchRepository = require('../repository/match');

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getLogger();
  this.logger.debug(message, meta);
};

const getAll = async (user) => {
  debugLog("Fetching all matches");
  const matches = await matchRepository.getAll();

  let filteredMatches = matches.filter(match => match.userId == user.id);
  debugLog(`Found ${filteredMatches.length} matches`);
  return {
    items: filteredMatches,
    count: filteredMatches.length
  };
};

const getById = async (id) => {
  debugLog(`Fetching match with id ${id}`);
  return await matchRepository.getById(id);
};

const create = async ({
  homeTeamId,
  awayTeamId,
  homeScore,
  awayScore,
  date,
  userId
}) => {
  //print all the paramenters
  debugLog('Creating new match', {
    homeTeamId,
    awayTeamId,
    homeScore,
    awayScore,
    date,
    userId
  });


  if (homeTeamId) {
    const existingHomeTeam = matchRepository.getById(homeTeamId);
    if (!existingHomeTeam) {
      throw new Error(`There is no team with id ${homeTeamId}`);
    }
  }
  if (awayTeamId) {
    const existingAwayTeam = matchRepository.getById(awayTeamId);
    if (!existingAwayTeam) {
      throw new Error(`There is no team with id ${awayTeamId}`);
    }
  }

  if (awayTeamId === homeTeamId) {
    throw new Error('Home team and away team cannot be the same');
  }

  const newMatch = {
    homeTeamId,
    awayTeamId,
    homeScore,
    awayScore,
    date: date.toISOString().split('T')[0],
    userId
  };
  debugLog('Creating new match', newMatch);
  matchRepository.create(newMatch);
  return newMatch;
}

// const updateById = (id, {
//   homeTeamId,
//   awayTeamId,
//   homeScore,
//   awayScore,
//   date
// }) => {
//   debugLog(`Updating match with id ${id}`, {
//     homeTeamId,
//     awayTeamId,
//     homeScore,
//     awayScore,
//     date
//   });

//   if (homeTeamId) {
//     const existingHomeTeam = TEAMS.find((team) => team.id === homeTeamId);
//     if (!existingHomeTeam) {
//       throw new Error(`There is no team with id ${homeTeamId}`);
//     }
//   }
//   if (awayTeamId) {
//     const existingAwayTeam = TEAMS.find((team) => team.id === awayTeamId);
//     if (!existingAwayTeam) {
//       throw new Error(`There is no team with id ${awayTeamId}`);
//     }
//   }

//   let match = MATCHES.find(m => m.id === parseInt(id));
//   if (!match) {
//     throw new Error("match does not exist");
//   }
//   match.homeTeamId = TEAMS.find((team) => team.id === homeTeam.Id);
//   match.awayTeamId = TEAMS.find((team) => team.id === awayTeamId);
//   match.homeScore = homeScore;
//   match.awayScore = awayScore;
//   match.date = date.toISOString();
//   return match;
// }

const deleteById = (id) => {
  debugLog(`Deleting match with id ${id}`);
  return matchRepository.deleteById(id);
}

module.exports = {
  getAll,
  getById,
  create,
  // updateById,
  deleteById,
}