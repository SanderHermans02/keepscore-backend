const {
  getLogger,
} = require('../core/logging');
const userRepository = require('../repository/user');

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getLogger();
  this.logger.debug(message, meta);
};

const getAllUsers = async () => {
  debugLog('Fetching all users');
  const users = await userRepository.getAllUsers();auth0Id
  return {
    items: users,
    count: users.length
  };
};

const register = async ({
  name,
  auth0Id,
}) => {
  console.log("incomming auth0Id " + auth0Id)
  debugLog('Creating a new user', {
    name,
  });
  return await userRepository.create({
    name,
    auth0Id,
  });
};

const getByAuth0Id = async (auth0Id) => {
  debugLog(`Fetching user with auth0Id ${auth0Id}`);
  const user = await userRepository.findByAuth0Id(auth0Id);

  if (!user) {
    getLogger().info(`No user with id ${auth0Id} exists`, {
      auth0Id,
    });
  }

  return user;
};

module.exports = {
  register,
  getByAuth0Id,
  getAllUsers,
};