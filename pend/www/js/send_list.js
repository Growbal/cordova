var app = {
    // Application Constructor。アプリ起動時に実行する関数かな
    initialize: function() {
      //deviceready... ネイティブとHTMLのブリッジのために初期化を行う。その初期化で発火するのがこのイベント
      //ちなみにHTMLが読み込んでるときはDOMContentLoadedイベントが発火する
      //その次にload。いつも使ってるやつ。その後にdeviceready
      document.getElementById("btn").addEventListener('click', this.SearchUser.bind(this), false);
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

    SearchUser: function(){
      //HTTP通信をする所
      var xhr = new XMLHttpRequest();
      //ここも大事。　DOMどすえ
      let text = document.getElementById('word').value;

      // ハンドラの登録.
      xhr.onload = function() {
          //readyState ... 送っている間の状況を見ることができる。すげえやつ
          switch ( xhr.readyState ) {
              case 4: // データ受信完了.
                // 200は無事に送れたという意味 300はぐぐって
                  if( xhr.status == 200 || xhr.status == 304 ) {
                      //さっきのwelcomeうほうほは　responseTextの中に入っているッッ!!
                      var data = xhr.responseText; // responseXML もあり
                      app.Total(JSON.parse(xhr.response));
                  } else {
                    //エラー処理
                      console.log( 'Failed. HttpStatus: '+xhr.statusText );
                  }
                  break;
          }
      };

      //どこのサーバーに送るかを指定する
      //サーバーへの送り方は２種類ある。 GETとPOSTの２種類がある。
      //GETはフロントからデータを送らないリクエスト。POSTはフロントからデータを送るリクエスト
      xhr.open('GET', `http://192.168.2.76:2525/UserSearch?name=${text}`, false);
      // POST 送信の場合は Content-Type は固定.
      //openだけでは送れていない。sendをすることで送ったことになる
      xhr.send("");
      xhr.abort(); // 再利用する際にも abort() しないと再利用できないらしい. ←そういうことらしい
    },

    Total: function(value){
      let view = document.getElementById("view");
      view.innerHTML = "";
      if(value.length <= 0)view.innerHTML = "該当する名前はありませんｗ"
      for(res of value){
        view.innerHTML = `
          <button class="change">${res.name}</button>
        `
      }
      let contents = document.getElementsByClassName('change');
      for(i of contents) i.addEventListener('click', (e) => {app.changePage(e)});
    },

    changePage: function(e){
      let target = e.target.innerHTML;
      localStorage.setItem("targetname", target);
      location.href = "./send_coin.html";
    }
};

app.initialize();
