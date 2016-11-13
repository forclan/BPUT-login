// http 模块用于发送POST请求
const http = require('http');
// 用于将对象数据转换成字符串
// querystring 的用法可以参考 https://nodejs.org/api/querystring.html
const querystring = require('querystring');


/**
 * 在此填入用户名密码：
 */
// 用户名
const id = ;
// 密码
const password = ;

// post请求需要传递的数据
var postBody = {
  'DDDDD': id,
  'upass': password,
  '0MKKey': '',
};

// 将Object对象的数据调用nodejs的API转化为String
var data = querystring.stringify(postBody);

// 请求的配置
var postOptions = {
  'host': '10.3.8.211',
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'charset': 'utf-8',
    // Content-Length属性是必需的，由之前的data长度计算得到
    // 可以参考 http://stackoverflow.com/questions/9768192/sending-data-through-post-request-from-a-node-js-server-to-a-node-js-server
    'Content-Length': Buffer.byteLength(data)
  },
};

var req = http.request(postOptions, function (res) {
  res.setEncoding('utf8');
  res.on('data', function (chunk) {
    // 用于判断是否登录的正则表达式
    var reg = /You have successfully logged into our system/ig;
    var success = reg.test(chunk);
    console.log(success ? 'successfully logined' : 'fail to login');
  });
});


req.write(data);

req.end();
