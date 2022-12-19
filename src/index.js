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

const main = async () => {
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

	app.use(bodyParser());
	app.use(async (ctx, next) => {
		const start = Date.now();
		await next();
		const ms = Date.now() - start;
		logger.info(`${ctx.method} ${ctx.url} - ${ms}ms`);
	});

	installRest(app);



	logger.info(`🚀 Server listening on http://localhost:9000`);
	app.listen(9000);
}

main();