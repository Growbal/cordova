//様式美。これがないとまず動かない
let http = require('http');
let server = http.createServer(function (req, res) {
  console.log('request starting...');
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Request-Method', '*')
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET')
  res.setHeader('Access-Control-Allow-Headers', '*');
});
//別のサーバーファイルを取得
// let hoge = require('./controllers/hoge'); これはサンプルなんで使わないでね
let Rooting = require('./controllers/Rooting');

//リクエストは全てルーティングテーブルに流す
server.on('request', Rooting.CheckEndPoint);
server.listen(2525);
