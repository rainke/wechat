var Koa = require('koa');
var sha1 = require('sha1');
var wechat = require('./wechat/g');
var config = {
	wechat:{
		appId:'wx7aecd428bc14d399',
		appScret: '6701c1e512c9840713d432f45dccdd7b',
		token: 'weixin'
	}
}

var app = new Koa();

app.use(wechat(config.wechat));
app.listen('1234')
// app.listen(80, '139.224.53.16');

console.log('start');