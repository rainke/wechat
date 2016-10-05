var Koa = require('koa');
var sha1 = require('sha1');
var wechat = require('./wechat/g');
var config = {
	wechat:{
		appId:'wx027405581ed8f1ee',
		appScret: 'e1080f8f2494f830c7429a8b2d9c0998',
		token: 'weixin'
	}
}

var app = new Koa();

app.use(wechat(config.wechat));
// app.listen('1234')
app.listen(80, '139.224.53.16');

console.log('start');