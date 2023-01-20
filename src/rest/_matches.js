const Router = require('@koa/router');
const matchService = require('../service/match');
const userService = require('../service/user');
const {
  addUserInfo
} = require('../core/auth');

const getAllMatches = async (ctx) => {
  const user = await userService.getByAuth0Id(ctx.state.user.sub);
  ctx.body = await matchService.getAll(user);
}

const createMatch = async (ctx) => {
  let userId = 0;
  try {
    const user = await userService.getByAuth0Id(ctx.state.user.sub);
    userId = user.id;
  } catch (e) {
    await addUserInfo(ctx);
    console.log("user id before register: " + ctx.state.user.sub)
    userId = await userService.register({
      auth0Id: ctx.state.user.sub,
      name: ctx.state.user.name,
    })
  }

  const newMatch = await matchService.create({
    ...ctx.request.body,
    date: new Date(ctx.request.body.date),
    userId
  });
  ctx.body = newMatch;
};

const getMatchById = async (ctx) => {
  ctx.body = await matchService.getById(ctx.params.id);
}

const updateMatch = async (ctx) => {
  ctx.body = matchService.updateById(ctx.params.id, {
    ...ctx.request.body,
    date: new Date(ctx.request.body.date)
  });
};

const deleteMatch = async (ctx) => {
  matchService.deleteById(ctx.params.id);
  ctx.status = 204;
};

/** 
@param {Router} app
*/
module.exports = function installMatchRouter(app) {
  const router = new Router({
    prefix: '/matchhistory',
  });

  router.get('/', getAllMatches);
  router.post('/', createMatch);
  router.get('/:id', getMatchById);
  router.put('/:id', updateMatch);
  router.delete('/:id', deleteMatch);

  app.use(router.routes()).use(router.allowedMethods());
};