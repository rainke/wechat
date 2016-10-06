var Koa = require('koa');
var sha1 = require('sha1');
var wechat = require('./wechat/g');
var path = require('path');
var util = require('./libs/util')

var wechat_file = path.join(__dirname, './config/wechat.txt');
var config = {
	wechat:{
		appID:'wx027405581ed8f1ee',
		appSecret: 'e1080f8f2494f830c7429a8b2d9c0998',
		token: 'weixin',
		getAccessToken: function() {
			return util.readFileAsync(wechat_file);
		},
		saveAccessToken: function(data) {
			data = JSON.stringify(data);
			return util.writeFileAsync(wechat_file, data);
		}
	}
}

var app = new Koa();

app.use(wechat(config.wechat));
// app.listen('1234')
app.listen(80, '139.224.53.16');

console.log('start');