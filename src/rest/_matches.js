const Router = require('@koa/router');
const matchService = require('../service/match');

const getAllMatches = async (ctx) => {
  ctx.body = await matchService.getAll();
}

const createMatch = async (ctx) => {

  ctx.body = matchService.create({
    ...ctx.request.body,
    date: new Date(ctx.request.body.date)
  });
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