const Router = require('@koa/router');
const teamService = require('../service/team');

const getAllTeams = async (ctx) => {
  ctx.body = await teamService.getAll();
}

const createTeam = async (ctx) => {
  const newTeam = await teamService.create({
    ...ctx.request.body,
  });
  ctx.body = newTeam;
};

const getTeamById = async (ctx) => {
  ctx.body = await teamService.getById(ctx.params.id);
}

const updateteam = async (ctx) => {
  ctx.body = teamService.updateById(ctx.params.id, {
    ...ctx.request.body,
    date: new Date(ctx.request.body.date)
  });
};

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
  router.put('/:id', updateteam);
  router.delete('/:id', deleteteam);

  app.use(router.routes()).use(router.allowedMethods());
};