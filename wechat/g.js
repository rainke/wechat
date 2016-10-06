var sha1 = require('sha1');
var getRawBody = require('raw-body');
var Wechat = require('./wechat');
var util =require('./util');

module.exports = function(opts) {
  // var wechat = new Wechat(opts);
  return function*(next) {
    var token = opts.token;
    var signature = this.query.signature;
    var nonce = this.query.nonce;
    var timestamp = this.query.timestamp;
    var echostr = this.query.echostr;

    var str = [token, timestamp, nonce].sort().join('');
    var sha = sha1(str);
    console.log(this.method);
    if(this.method == 'GET') {
      if (sha === signature) {
        this.body = echostr + '';
      } else {
        this.body = 'wrong';
      }
    } else if(this.method == 'POST') {
      if(sha !== signature) {
        this.body = 'wrong';

        return false;
      } 
      var data = yield getRawBody(this.req, {
        length: this.length,
        limit: '1mb',
        encoding: this.charset
      });

      var content = yield util.parseXMLAsync(data)
      console.log(content);
      var message = util.formatMessage(content.xml);
      console.log(message);

      if(message.MsgType == 'event') {
        if(message.Event === 'subscribe') {
          var now = new Date() * 1;
          this.status = 200;
          this.type = 'application/xml';
          this.body = `<xml>
              <ToUserName><![CDATA[${message.FromUserName}]]></ToUserName>
              <FromUserName><![CDATA[${message.ToUserName}]]></FromUserName>
              <CreateTime>${now}</CreateTime>
              <MsgType><![CDATA[text]]></MsgType>
              <Content><![CDATA[hi, 感谢你的关注]]></Content>
              </xml>`;
          return;
        }
      } else if(message.MsgType == 'text') {
        var now = new Date() * 1;
        this.status = 200;
        this.type = 'application/xml';
        this.body = `<xml>
            <ToUserName><![CDATA[${message.FromUserName}]]></ToUserName>
            <FromUserName><![CDATA[${message.ToUserName}]]></FromUserName>
            <CreateTime>${now}</CreateTime>
            <MsgType><![CDATA[text]]></MsgType>
            <Content><![CDATA[你输入了:${message.Content}]]></Content>
            </xml>`;
        return;
      }
    }
    
  }
}
