const Router = require('@koa/router');
const teamService = require('../service/team');
const userService = require('../service/user');
const {
  addUserInfo
} = require('../core/auth');

const getAllTeams = async (ctx) => {
  const user = await userService.getByAuth0Id(ctx.state.user.sub);
  ctx.body = await teamService.getAll(user);
}

const createTeam = async (ctx) => {
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


  const newTeam = await teamService.create({
    ...ctx.request.body,
    userId
  });
  ctx.body = newTeam;
};

const getTeamById = async (ctx) => {
  ctx.body = await teamService.getById(ctx.params.id);
}

const deleteteam = async (ctx) => {
  teamService.deleteById(ctx.params.id);
  ctx.status = 204;
};

/** 
@param {Router} app
*/
module.exports = function installTeamRouter(app) {
  const router = new Router({
    prefix: '/teams',
  });

  router.get('/', getAllTeams);
  router.post('/', createTeam);
  router.get('/:id', getTeamById);
  router.delete('/:id', deleteteam);

  app.use(router.routes()).use(router.allowedMethods());
};