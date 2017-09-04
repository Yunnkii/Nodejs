
var http = require('http');
/*createServer接受一个函数作为参数，request对象表示客户端的Http请求，response对象表示服务器的http回应*/
http.createServer(function (request,response){
	/*头部用 writeHead*/
	response.writeHead(200,{'Content-Type':'text/plain'});
	response.write("hello world");
	/*end用于写入回应内容并结束此次对话*/
	response.end("helo");

}).listen(8080,'127.0.0.1');
console.log("is listening 8080 port");




/*事先写好网页，用fs模块读取网页将其返回,中文也可以正常显示*/
var http  = require('http');
var fs = require('fs');
http.createServer(function (request,response){
	fs.readFile('data.txt',function readData(err,data){
		response.writeHead(200,{'Content-Type':'text/plain'});
		response.end(data);
	})
}).listen(8080,'127.0.0.1');
console.log("数据读取完毕");



/*根据不同的网址请求，显示不同的内容*/
var http = require('http');
var fs = require('fs');
http.createServer(function (request,response){
	if(request.url=='/'){
		response.writeHead(200,{'Content-Type':'text/plain'});
		fs.readFile('data.txt',function readData(err,data){
			response.end(data);
		})
		
	} else if (request.url=='/about') {
		response.writeHead(200,{'Content-Type':'text/plain'});
		response.end("welcome to abour");
	} else {
		response.writeHead(404,{'Content-Type':'text/plain'});
		response.end('404 err');
	}
}).listen(8080,'localhost');


var http = require('http');
var url = require('url');
http.createServer(function (req,res){
	console.log(url.parse(req.url).pathname); // /
	console.log(req.url);// /
	console.log(req.method); //get
	console.log(req.headers);

}).listen(8080,'127.0.0.1');
/*{ host: 'localhost:8080',
  connection: 'keep-alive',
  'upgrade-insecure-requests': '1',
  'user-agent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Ge
cko) Chrome/60.0.3112.101 Safari/537.36',
  accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,imag
e/apng,*//* ;q=0.8',
  'accept-encoding': 'gzip, deflate, br',
  'accept-language': 'zh-CN,zh;q=0.8',
  cookie: '_ga=GA1.1.1149481347.1504336452; _gid=GA1.1.796447733.1504336452' }
*/


/*addlistener()用于为请求添加监听事件的回调函数*/
var querystring = require('querystring');
var postData = '';
var http = require('http');
http.createServer(function (req,res){
	req.addListener('data', function (postDataChunk){
		postData += postDataChunk;
	});
	req.addListener('end', function (){
		res.writeHead(200,{'Content-Type':'text/plain'});
		res.write("text:"+querystring.parse(postData).text); //undefined
		res.end();
	});


/*处理异步请求*/
var  exec = require('child_process').exec;
exec('ls -lah',function (err,stdout,stderr){
	res.writeHead(200,{});
	res.write(stdout);
	res.end();
});

/*处理post请求*/
var http = require('http');
http.createServer(function (req,res){
	var content = '' ; 

	req.on('data',function (chunk){
		content +=chunk;
	});

	req.on('end', function (){
		res.writeHead(200,{'Content-Type':'text/plain'});
		res.write(content);
		res.end();
	});

}).listener(8080);

/*文件上传*/

var http= require('http');
var fs = require('fs');
var destinationFile,fileSize,uploadedBytes;
http.createServer(function (req,res){
	res.writeHead(200);
	destinationFile = fs.createWriteStream('data.txt');
	req.pipe(destinationFile);
	fileSize = req.headers['content-length'];
	uploadedBytes = 0;

	req.on('data',function (d){
		uploadedBytes +=d.length;
		var p = (uploadedBytes/fileSize)*100;
		res.write("Uploading " + parseInt(p, 0) + " %\n");
	});
	req.on('end',function (){
		res.end("file upload complete");
	});
}).listen(3030, function () {
  console.log("server started");
});


/*发出请求get()*/


var http = require('http');

var options = {
    host: 'baidu.com',
    method: 'GET',
    path: '/'
};

var req = http.request(options);
req.on('response', function(res){
    res.setEncoding('utf8');
    console.log(res.statusCode);
    console.log(res.headers);

    /* 200
		{ date: 'Mon, 04 Sep 2017 09:06:03 GMT',
		  server: 'Apache',
		  'last-modified': 'Tue, 12 Jan 2010 13:48:00 GMT',
		  etag: '"51-47cf7e6ee8400"',
		  'accept-ranges': 'bytes',
		  'content-length': '81',
		  'cache-control': 'max-age=86400',
		  expires: 'Tue, 05 Sep 2017 09:06:03 GMT',
		  connection: 'Close',
		  'content-type': 'text/html' }
    */
    res.on('data', function(chunk){
        console.log('收到数据：%s', chunk);
    });
});
req.end();


/*get方式*/

var http = require('http');
http.get('http://www.baidu.com/', function (response) {
    var body = [];

    console.log(response.statusCode); //200
    console.log(response.headers); 
    /*{ date: 'Mon, 04 Sep 2017 09:00:32 GMT',
		  'content-type': 'text/html',
		  'content-length': '14613',
		  'last-modified': 'Thu, 31 Aug 2017 03:03:00 GMT',
		  connection: 'Close',
		  vary: 'Accept-Encoding',
		  'set-cookie':
		   [ 'BAIDUID=0BF2C832F4F214F31AA84CD801D2624D:FG=1; expires=Thu, 31-Dec-37 23:55:5
		5 GMT; max-age=2147483647; path=/; domain=.baidu.com',
		     'BIDUPSID=0BF2C832F4F214F31AA84CD801D2624D; expires=Thu, 31-Dec-37 23:55:55 GM
		T; max-age=2147483647; path=/; domain=.baidu.com',
		     'PSTM=1504515632; expires=Thu, 31-Dec-37 23:55:55 GMT; max-age=2147483647; pat
		h=/; domain=.baidu.com' ],
		  p3p: 'CP=" OTI DSP COR IVA OUR IND COM "',
		  server: 'BWS/1.1',
		  'x-ua-compatible': 'IE=Edge,chrome=1',
		  pragma: 'no-cache',
		  'cache-control': 'no-cache',
		  'accept-ranges': 'bytes' }
	*/

    response.on('data', function (chunk) {
        body.push(chunk);
    });

    response.on('end', function () {
        body = Buffer.concat(body);
        console.log(body.toString());
    });
});