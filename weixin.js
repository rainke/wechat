
var config = require('./config')
var Wechat = require('./wechat/wechat')
var wechatApi = new Wechat(config.wechat);


exports.reply = function* (next) {
	var message = this.weixin;

	if(message.MsgType == 'event') {
		if(message.Event == 'subscribe'){
			if(message.EventKey) {
				console.log(`qrcode${message.EventKey} ${message.ticket}`)
			}
			this.body = 'haha,订阅了'
		} else if(message.Event =='unsubscribe') {
			this.body = '无情取关'
		} else if(message.Event == 'LOCATION'){
			this.body = `you location is ${message.Latitude} ${message.Longitude} ${message.Precision}`
		} else if(message.Event === 'CLICK') {

		} else if(message.Event === 'SCAN') {

		} else if(message.Event == 'VIEW') {

		}


	} else if(message.MsgType == 'text') {
		var content = message.Content;
		var reply = `你说的${content} 太复杂了`;
		if(content === '1') {
			reply = '天下第一';
		} else if(content == '3') {
			reply = 'hehe'
		} else if(content == '4') {

			reply = [{
				title:'技术改变世界',
				description: '描述',
				picUrl:'http://img.mukewang.com/57d21eb1000111e012000460.jpg',
				url:'https://github.com'
			}]
		} else if(content == '5') {
			var data = yield wechatApi.uploadMaterial('image', './static/1.jpg')
			.then(function(data) {
				reply = {
					type:'image',
					mediaId:data.media_id
				}
			})
		}
		this.body = reply
	}
	yield next;
}