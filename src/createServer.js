const Koa = require('koa');
const config = require('config');
const installRest = require('./rest');
const cors = require('@koa/cors');
const {
	getLogger,
	initializeLogger
} = require('./core/logging')
const bodyParser = require('koa-bodyparser');
const {
	initializeData
} = require('./data');
const {
	checkJwtToken
} = require('./core/auth');
const {
	getByAuth0Id
} = require('./service/user');

module.exports = async function createServer() {
	const NODE_ENV = config.get('env');
	const LOG_LEVEL = config.get('log.level');
	const LOG_DISABLED = config.get('log.disabled');

	initializeLogger({
		level: LOG_LEVEL,
		disabled: LOG_DISABLED,
		defaultMeta: {
			NODE_ENV
		}
	});

	await initializeData();

	const app = new Koa();
	app.use(cors());

	const logger = getLogger();
	app.use(checkJwtToken());
	app.use(bodyParser());
	app.use(async (ctx, next) => {
		const start = Date.now();
		await next();
		const ms = Date.now() - start;
		logger.info(`${ctx.method} ${ctx.url} - ${ms}ms`);
		// logger.debug(ctx.headers.authorization); // 👈 1
		logger.info("User with id: " + ctx.state.user.sub) // 👈 2
		// logger.debug(ctx.state.jwtOriginalError); // 👈 3
	});

	installRest(app);

	return {
		getApp() {
			return app;
		},

		start() {
			return new Promise((resolve) => {
				const port = config.get('port');
				app.listen(port);
				logger.info(`🚀 Server listening on http://localhost:${port}`);
				resolve();
			});
		},

		async stop() {
			{
				app.removeAllListeners();
				await shutdownData();
				getLogger().info('Goodbye ❤');
			}
		},
	};

};