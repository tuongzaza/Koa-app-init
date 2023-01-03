require('dotenv').config('.env');
const koa = require('koa');
const app = new koa();
var server = require('http').createServer(app.callback());
const logger = require('koa-morgan');
const bodyParser  = require('koa-bodyparser');
const render = require('koa-ejs');
const path = require('path');
const serve = require('koa-static');

var indexRouter = require('./routes/index');

//connect db
// require('./bin/connect_mongo');
// require('./bin/connect_redis');

// view engine setup
render(app, {
  root: path.join(__dirname, 'views'),
  layout: 'layout',
  viewExt: 'html',
  cache: false,
  debug: false
})

app.use(logger('dev'));
app.use(bodyParser());
app.use(serve('./public'));

// error handler
app.use(async function(ctx, next) {
  try {
    await next();

    const status = ctx.status || 404
    if (status === 404) {
        ctx.throw(404)
    }
  } catch(err) {
      console.error(err);

      ctx.status = err.status || 500;
      if (ctx.status === 200) {
          if (typeof err.message === 'string') {
              ctx.body = {status: false, message: err.message};
          } else {
              ctx.body = {status: false, data: err.message};
          }
      } else if (ctx.status === 404) {
          ctx.body = {status: false, message: "URL NOT FOUND"};
      } else {
          ctx.body = err;
      }
  }
});

app.use(indexRouter);


var port = process.env.PORT || '3000';
server.listen(port, () => {
  console.log(`App run at port ${port}`);
});
