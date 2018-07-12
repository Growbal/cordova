var app = {
    // Application Constructor。アプリ起動時に実行する関数かな
    initialize: function() {
      document.getElementById("acount_name").innerHTML = localStorage.getItem('targetname');
      document.getElementById("yes").addEventListener('click', this.onBackClickEvent.bind(this), false);
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

    confirmCallback(id) {
      if (1 == id) { //終了のボタンが押されたら
        app.SendMoney(); //アプリ終了
      }
    },

    onBackClickEvent() {
      navigator.notification.confirm( //カスタマイズ可能な確認用ダイアログボックスを表示
        `以下の金額で${localStorage.getItem('targetname')}さんに\n送金しますか？\n\n送金額: ￥${document.getElementById('coinbox').value}`, // メッセージ
        this.confirmCallback, // コールバックは、押されたボタンのインデックスで呼び出す
        "送金確認", // タイトル
        "送金,キャンセル" // ボタンの表示名
      )
    },

    SendMoney: function(){
      //HTTP通信をする所
      var xhr = new XMLHttpRequest();
      //ここも大事。　DOMどすえ
      let text = document.getElementById('coinbox').value;

      // ハンドラの登録.
      xhr.onload = function() {
          //readyState ... 送っている間の状況を見ることができる。すげえやつ
          switch ( xhr.readyState ) {
              case 4: // データ受信完了.
                // 200は無事に送れたという意味 300はぐぐって
                  if( xhr.status == 200 || xhr.status == 304 ) {
                      //さっきのwelcomeうほうほは　responseTextの中に入っているッッ!!
                      var data = xhr.responseText; // responseXML もあり
                      app.changePage();
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
      xhr.open('GET', `http://jupiter.tntetsu-lab.cs.kanagawa-it.ac.jp/Trading?servecename=Abe&targetname=${localStorage.getItem('targetname')}&value=${text}`, false);
      // POST 送信の場合は Content-Type は固定.
      //openだけでは送れていない。sendをすることで送ったことになる
      xhr.send("");
      xhr.abort(); // 再利用する際にも abort() しないと再利用できないらしい. ←そういうことらしい
    },

    changePage: function(){
      location.href = "./home.html";
    }
};

app.initialize();
