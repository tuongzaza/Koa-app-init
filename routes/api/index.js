const Router = require('@koa/router');
const router = new Router();

/* GET home page. */
router.post('/', function(ctx, next) {
  return ctx.body = { title: 'Koa JS' };
});

module.exports = router.routes();
