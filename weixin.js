
var config = require('./config')
var Wechat = require('./wechat/wechat')
var wechatApi = new Wechat(config.wechat);
var path = require('path');


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
			yield wechatApi.uploadMaterial('image', path.join(__dirname,'./static/1.jpg'))
			.then(function(data) {
				console.log('46', data);
				reply = {
					type:'image',
					mediaId:data.media_id
				}
			})
		} else if(content == '6') {
			reply = {
				type:'video',
				title:'学习redux',
				description:'呵呵',
				mediaId:'n0VY2HEsaITw0vawkcVy796x0j4nSZ9Vu9SFqAUvC2mHciZYTAGPQIu2mua5wxcw'
			}
			// yield wechatApi.uploadMaterial('video', path.join(__dirname,'./static/2.MP4'))
			// .then(function(data) {
			// 	console.log(data);
			// 	reply = {
			// 		type:'video',
			// 		title:'学习redux',
			// 		description:'呵呵',
			// 		mediaId:data.media_id
			// 	}
			// })
		} else if(content == 7) {
			yield wechatApi.uploadMaterial('image', path.join(__dirname,'./static/2.jpg'))
			.then(function(data) {
				reply = {
					type: 'music',
					title:'陪俺',
					description: '小戏骨',
					musicUrl:'http://so1.111ttt.com:8282/2016/1/10/10/203101332271.mp3?tflag=1476078544&pin=79a6913db9059979e3b65088426852bc&ip=125.71.161.91#.mp3',
					thumbMediaId: data.media_id
				}
			})
			
		} else if(content == '8') {
			yield wechatApi.uploadMaterial('image', path.join(__dirname,'./static/1.jpg'),{type: 'image'})
			.then(function(data) {
				console.log('46', data);
				reply = {
					type:'image',
					mediaId:data.media_id
				}
			})
		}else if(content == '9') {
			yield wechatApi.uploadMaterial('image',
				path.join(__dirname,'./static/1.jpg'),
				{type: 'image'}
			)
			.then(function(data) {
				console.log('46', data);
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