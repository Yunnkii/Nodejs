### express一点点使用

#### 目标

用express实现在浏览器本地访问http://localhost:3000 输出文字

#### 知识

1.npm包管理，用npm安装所需依赖

2.使用express，新建实例，输出文字

express官网：

[http://expressjs.com/](http://expressjs.com/)

```
$mkdir app && cd app
# 从某个版本之后发生了改变需要首先初始化npm，这里会新建一个package.json # 配置文件，否则直接安装包会报错。
$npm init
# 下载之后目录里面会多出一个node_modules的文件夹
$npm install express
```



```
# 引入express的模块，赋予变量express等待使用
var express = require('express');
#调用express方法，返回一个express的实例，赋给变量app
var app = express();
// app 本身有很多方法，其中包括最常用的 get、post、put/patch、delete，在这里我们调用其中的 get 方法，为我们的 `/` 路径指定一个 handler 函数。
// 这个 handler 函数会接收 req 和 res 两个对象，他们分别是请求的 request 和 response。
// request 中包含了浏览器传来的各种信息，比如 query 啊，body 啊，headers 啊之类的，都可以通过 req 对象访问到。
// res 对象，我们一般不从里面取信息，而是通过它来定制我们向浏览器输出的信息，比如 header 信息，比如想要向浏览器输出的内容。这里我们调用了它的 #send 方法，向浏览器输出一个字符串。
app.get('/',function (req,res){
  res.send("hello");//向浏览器输出信息用send
})
app.listen(3000,function (){
  console.log("3000 端口正在监听")
});
```



```
var express = require('express');
var app = express();
app.get('/',function (req,res){
  res.send('hello');
});
app.listen(3000,function (){
  console.log("3000")
})
```

执行

```
$ node app.js
```

#### http模块方式实现

```
var http = require('http');
http.createServer(function (req,res){
  res.writeHead(200,{'Content-Type':'text/plain'});
  res.write("hello");
  res.end();
}).listen(3000,'127.0.0.1');
console.log("Server is  started");
```

上面也是 http模块处理get请求的方式



#### 处理post请求

```
var http = require('http');
http.createServer(function (req,res){
var content = '';
  req.on('data',function (chunk){
    content +=chunk;
  });
  req.on('end',function (){
    res.writeHead(200,{'Content-Type':'text/plain'});
    res.write("You've sent "+content);
    res.end();
  })
})
```

#### 发出请求

1.get方式

```
var http = require('http');
var options = {
  host:'baidu.com',
  path: '/',
  method: 'get'
}
http.get(options,function (res){
  var body = '';
  res.on('data',function(chunk){
    body +=chunk;
  });
  res.on('end',function (){
    
  })
});
```

2.request方式

```
http.request(options[,callback]);
```

```
var http = require('http');
var querystring = require('querystring');
var postData = querystring.stringify({
  'msg':'hello'
});
var options = {
  hostname: 'baidu.com',
  port:8080,
  path: '/upload',
  method:'post',
  headers:{
    'Content-Type':'application/x-www-form-urlencoded',
    'content-length':post
  }
}
var req = http.request(options,function (res){
  console.log('status'+res.statusCode);
  console.log('headers'+JSON.stringify(res.headers));
  res.setEncoding('utf8');
  res.on('data',function (chunk){
    console.log(chunk);
  });
});
req.on('error',function (e){
  console.log("problem with request"+error);
});
req.write(postData);
req.end();
```

> 上述代码中req.end()必须被调用。表示请求http请求完成。

如果要看详细的请看   [阮一峰关于http模块的讲述](http://javascript.ruanyifeng.com/nodejs/http.html)

