var http=require('http');
var fs=require('fs');
var path=require('path');
let url = require('url');

var mimeTypes={
  '.html' : 'text/html',
  '.css' : 'text/css',
  '.js' : 'text/javascript',
  '.jpg' : 'image/jpg',
  '.png' : 'image/png',
  '.mp3' : 'audio/mpeg'
};

let Test = require('./controllers/Test');
let BlanceCheck = require('./controllers/BlanceCheck');
let UserSearch = require('./controllers/UserSearch');
let Trading = require('./controllers/Trading');
let Login = require('./controllers/Login');

var server = http.createServer();
server.on('request',doRequest);
server.listen(process.env.PORT || 8000);
console.log('うほうほサーバー');

function doRequest(req,res){
  res.setHeader('Access-Control-Allow-Origin', '*')
res.setHeader('Access-Control-Request-Method', '*')
res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET')
res.setHeader('Access-Control-Allow-Headers', '*')
  var lookup = decodeURI(req.url);
  if(lookup.match(/\/api/)){
    CheckEndPoint(req, res);
    return;
  }
  var targetFile = __dirname + '/www' + lookup;
  console.log(targetFile);
  if(targetFile == (__dirname + '/www/')){
    targetFile = __dirname + '/www/login.html';
  }
  console.log(targetFile);
  fs.exists(targetFile , function(exists){
    if(exists){
      fs.readFile(targetFile,function(err,data){
        if(err){
          res.writeHead(404, {'Content-Type':'text/html;charset=UTF-8'});
          res.end('<html><body><h1>404 Not Found</h1><p>そうゆう粗探しはやめて大人しくYoutubeでも見た方が人生のためですよ</p></body></html>');
          return;
        }
        var headers = {'Content-Type': mimeTypes[path.extname(targetFile)] + ';charset=UTF-8'};
        res.writeHead(200,headers);
        res.end(data);
        console.log(targetFile+'が開かれた'+'mimeType:'+mimeTypes[path.extname(targetFile)]);
        console.log(path.extname(targetFile));
      });
      return;
    }
    res.writeHead(404, {'Content-Type':'text/html;charset=UTF-8'});
    res.end('<html><body><h1>404 Not Found</h1><p>そうゆう粗探しはやめて大人しくYoutubeでも見た方が人生のためですよ</p></body></html>');
  });
}

function CheckEndPoint(req, res){
  let UrlData = url.parse(req.url);
  UrlData.pathname = UrlData.pathname.replace(/\/api/g, "");
  switch(UrlData.pathname){
    case '/':
      Test.test(req, res);
      break;

    case '/BlanceCheck':
      BlanceCheck.process(req, res, UrlData.query);
      break;

    case '/TradingCheck':
      Trading.check(req, res, UrlData.query);
      break;

    case '/UserSearch':
      UserSearch.process(req, res, UrlData.query);
      break;

    case '/Trading':
      Trading.process(req, res, UrlData.query);
      break;

    case '/Login':
      Login.process(req, res, UrlData.query);
      break;
  }
}
