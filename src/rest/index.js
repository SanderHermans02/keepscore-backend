const Router = require('@koa/router');
const {
  Logger,
  loggers
} = require('winston');
const installMatchRouter = require('./_matches');
const installHealthRouter = require('./_health');
const installTeamRouter = require('./_teams');


/**
 * Install all routes in the given Koa application.
 *
 * @param {Koa} app - The Koa application.
 */
module.exports = function installRest(app) {
  const router = new Router({
    prefix: '/api',
  });


  installMatchRouter(router);
  installTeamRouter(router);
  installHealthRouter(router);

  app.use(router.routes()).use(router.allowedMethods());
};