var path = require('path');
var util = require('./libs/util')

var wechat_file = path.join(__dirname, './config/wechat.txt');
var config = {
	wechat:{
		// appID:'wx027405581ed8f1ee',
		// appSecret: 'e1080f8f2494f830c7429a8b2d9c0998',
		appID:'wx7aecd428bc14d399',
		appSecret:'6701c1e512c9840713d432f45dccdd7b',
		token: 'hepeng',
		getAccessToken: function() {
			return util.readFileAsync(wechat_file);
		},
		saveAccessToken: function(data) {
			data = JSON.stringify(data);
			return util.writeFileAsync(wechat_file, data);
		}
	}
}
module.exports = config;