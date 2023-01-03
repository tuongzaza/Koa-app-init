const Router = require('@koa/router');
const router = new Router();

/* GET home page. */
router.get('/', function(ctx, next) {
  return ctx.render('index', { title: 'Koa JS' });
});

module.exports = router.routes();
