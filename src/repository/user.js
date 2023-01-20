const {
  tables,
  getKnex
} = require('../data/index');
const {
  getLogger
} = require('../core/logging');

const findByAuth0Id = async (auth0Id) => {
  return await getKnex()(tables.user)
    .where('auth0Id', auth0Id)
    .first();
};

const getAllUsers = async () => {
  return await getKnex()(tables.user)
    .select();
};



const create = async ({
  name,
  auth0Id,
}) => {
  try {
    console.log('create user', name, auth0Id)
    let email = name
    const [id] = await getKnex()(tables.user)
      .insert({
        auth0Id,
        email,
      });
    return id;
  } catch (error) {
    const logger = getLogger();
    logger.error('Error in create', {
      error,
    });
    throw error;
  }
};

module.exports = {
  findByAuth0Id,
  create,
  getAllUsers,
};