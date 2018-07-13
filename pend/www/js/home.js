// html内の要素を読み込む
var sendCoinBtn = document.querySelector("#send_coin");
var transactionBtn = document.querySelector("#transaction");
var settingBtn = document.querySelector("#setting");
var notificationBtn = document.querySelector("#notification");

// ボタンが押されたときに関数を実行する
sendCoinBtn.onclick = function(){
	GoLink(1);
}
transactionBtn.onclick = function(){
	GoLink(2);
}
settingBtn.onclick = function(){
	alert("未実装です♡");
//	GoLink(3);
}
notificationBtn.onclick = function(){
	alert("未実装です♡");
//	GoLink(4);
}

// 数字に対応したページへ移動する関数
function GoLink(num){
	if(num == 1){
		href = "./send_list.html";
	}else if(num == 2){
		href = "./trade.html";
	}else if(num == 3){
		href = "./not_found.html";
	}else if(num == 4){
		href = "./not_found.html";
	}else{
		href = "./not_found.html";
	}
 	location.href = href;
}

var app = {
    // Application Constructor。アプリ起動時に実行する関数かな
    initialize: function() {
			document.getElementById("user_name").innerHTML = localStorage.getItem('myname');
			this.BalanceCheck();
      //  document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },
    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
      console.log("ds");
        this.receivedEvent('deviceready');
    },

    BalanceCheck: function(){

      //HTTP通信をする所
      var xhr = new XMLHttpRequest();
			let name = "Abe";
      // ハンドラの登録.
      xhr.onload = function() {
          //readyState ... 送っている間の状況を見ることができる。すげえやつ
          switch ( xhr.readyState ) {
              case 4: // データ受信完了.
                // 200は無事に送れたという意味 300はぐぐって
                  if( xhr.status == 200 || xhr.status == 304 ) {
                      //さっきのwelcomeうほうほは　responseTextの中に入っているッッ!!
                      var data = JSON.parse(xhr.response); // responseXML もあり
											console.log(data);
                      document.getElementById("coin").innerHTML = data[0]["balance"].toLocaleString();
                  } else {
                    //エラー処理
                      console.log( 'Failed. HttpStatus: '+ xhr.statusText );
                  }
                  break;
          }
      };

      //どこのサーバーに送るかを指定する
      //サーバーへの送り方は２種類ある。 GETとPOSTの２種類がある。
      //GETはフロントからデータを送らないリクエスト。POSTはフロントからデータを送るリクエスト
      xhr.open('GET', `http://jupiter.tntetsu-lab.cs.kanagawa-it.ac.jp/BlanceCheck?targetname=${name}`, false);
      // POST 送信の場合は Content-Type は固定.
      //openだけでは送れていない。sendをすることで送ったことになる
      xhr.send("");
      xhr.abort(); // 再利用する際にも abort() しないと再利用できないらしい. ←そういうことらしい
    },
};

app.initialize();
