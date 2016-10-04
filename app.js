var Koa = require('koa');
var sha1 = require('sha1');
var config = {
	wechat:{
		appId:'wx027405581ed8f1ee',
		appScret: '6701c1e512c9840713d432f45dccdd7b',
		token: 'weixin'
	}
}

var app = new Koa();

app.use(function *(next) {
	console.log(this.query);
	var token = config.wechat.token;
	var signature = this.query.signature;
	var nonce = this.query.nonce;
	var timestamp = this.query.timestamp;
	var ecostr = this.query.ecostr;

	var str = [token, timestamp, nonce].sort().join('');
	var sha = sha1(str);
	if(sha === signature) {
		this.body = ecostr + '';
	} else {
		this.body = 'wrong';
	}
});
app.listen(80, '139.224.53.16');
console.log('start');