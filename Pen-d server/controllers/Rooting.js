//モジュールのインポート
let url = require('url');// 今は使ってないけどクエリパラメータが来たとき用に使う

//別のサーバーファイルを取得
let Test = require('./Test');
let BlanceCheck = require('./BlanceCheck');
let UserSearch = require('./UserSearch');
let Trading = require('./Trading');

//ルーティングテーブル、 switchでする必要ある？
function CheckEndPoint(req, res){
  let UrlData = url.parse(req.url);
  console.log("ok");
  switch(UrlData.pathname){
    case '/':
      Test.test(req, res);
      break;

    case '/BlanceCheck':
      BlanceCheck.process(req, res, UrlData.query);
      break;

    case '/UserSearch':
      UserSearch.process(req, res, UrlData.query);
      break;

    case '/Trading':
      Trading.process(req, res, UrlData.query);
      break;
  }
}

exports.CheckEndPoint = CheckEndPoint;
