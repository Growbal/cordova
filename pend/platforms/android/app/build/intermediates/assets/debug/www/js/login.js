var app = {
    // Application Constructor。アプリ起動時に実行する関数かな
    initialize: function() {
      document.getElementById("submit").addEventListener('click', this.SendMoney.bind(this), false);
       document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },
    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
      if(localStorage.getItem('id') && localStorage.getItem('password')){
        var xhr = new XMLHttpRequest();
        xhr.onload = function() {
            switch ( xhr.readyState ) {
                case 4:
                    if( xhr.status == 200 || xhr.status == 304 ) {
                        if(JSON.parse(xhr.response).length){
                          sessionStorage.setItem("myname", localStorage.getItem('id'));
                          location.href = "./home.html";
                        };
                    } else {
                        console.log( 'Failed. HttpStatus: '+ xhr.statusText );
                    }
                    break;
            }
        };
        xhr.open('GET', `http://jupiter.tntetsu-lab.cs.kanagawa-it.ac.jp/Login?username=${localStorage.getItem('id')}&password=${localStorage.getItem('password')}`, false);
        xhr.send("");
        xhr.abort();
      }
    },

    SendMoney: function(){
      //HTTP通信をする所
      var xhr = new XMLHttpRequest();
      //ここも大事。　DOMどすえ
      let username = document.getElementById('username').value;
      let password = document.getElementById('password').value;

      // ハンドラの登録.
      xhr.onload = function() {
          //readyState ... 送っている間の状況を見ることができる。すげえやつ
          switch ( xhr.readyState ) {
              case 4: // データ受信完了.
                // 200は無事に送れたという意味 300はぐぐって
                  if( xhr.status == 200 || xhr.status == 304 ) {
                      //さっきのwelcomeうほうほは　responseTextの中に入っているッッ!!
                      app.changePage(JSON.parse(xhr.response));
                      // document.getElementById('username').value = data.length;
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
      xhr.open('GET', `http://jupiter.tntetsu-lab.cs.kanagawa-it.ac.jp/Login?username=${username}&password=${password}`, false);
      // POST 送信の場合は Content-Type は固定.
      //openだけでは送れていない。sendをすることで送ったことになる
      xhr.send("");
      xhr.abort(); // 再利用する際にも abort() しないと再利用できないらしい. ←そういうことらしい
    },

    changePage: function(data){
      if(data.length == 0){
        document.getElementById("error").innerHTML = "ユーザー名、またはパスワードが違っています"
        return;
      }

      let check = document.getElementById("check");
      if(check.checked){
        localStorage.setItem("id", document.getElementById('username').value);
        localStorage.setItem("password", document.getElementById('password').value);
      };

      let username = document.getElementById('username').value;
      sessionStorage.setItem("myname", username);
      location.href = "./home.html";
    }
};

app.initialize();
