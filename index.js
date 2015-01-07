var koa = require('koa');
var app = koa();
var router = require('koa-router');
var mount = require('koa-mount');
var logger = require('koa-logger');
var limit = require('koa-better-ratelimit');
var api = require('./api/api.js');
var compress = require('koa-compress');

var public_dir = require('koa-static');
app.use(router(app));
//app.use(public_dir(__dirname + "/public"));


app.get('/', api.home);

app.get('/result', api.result);
app.get('/phone', api.phone);

app.use(function *(next){
  try {
    yield next;
  } catch (err) {
    this.type = 'json';
    this.status = err.status || 500;
    this.body = {'error': 'The application just went bonkers. Contact Scotland Yard for thorough investigation. Or simply contact the dev'};
    // delegating error to the regular applications
    this.app.emit('error', err, this);
  }
});

  // rate limiting
	app.use(limit({
	  duration: 1000 * 60 * 3, //3 mins
	  max: 5,
	  //blackList: ['127.0.0.1']
	}));
  // logging
  app.use(logger());
app.use(compress({
  filter: function (content_type) {
      return /text/i.test(content_type)
  },
  threshold: 2048,
  flush: require('zlib').Z_SYNC_FLUSH
}));
module.exports = app;
if (!module.parent) app.listen(3030);
console.log('Server is Running on http://localhost:3030/');