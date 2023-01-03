const Router = require('@koa/router');
const router = new Router();

var ApiRouter = require('./api');
var WebRouter = require('./web');

router.use('/api', ApiRouter);
router.use(WebRouter);

module.exports = router.routes();
