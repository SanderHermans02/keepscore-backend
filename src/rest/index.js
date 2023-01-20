const Router = require('@koa/router');

const installMatchRouter = require('./_matches');
const installHealthRouter = require('./_health');
const installTeamRouter = require('./_teams');
const installUserRouter = require('./_user');




/**
 * Install all routes in the given Koa application.
 *
 * @param {Koa} app - The Koa application.
 */
module.exports = function installRest(app) {
  const router = new Router({
    prefix: '/api',
  });

  app.use(async (ctx, next) => {
    try {
      if (ctx.state.user.sub) {
        await next();
      }
    } catch (err) {
      ctx.throw(401, 'Unauthorized');
      return;
    }
  })

  installMatchRouter(router);
  installTeamRouter(router);
  installHealthRouter(router);
  installUserRouter(router);

  app.use(router.routes()).use(router.allowedMethods());
};