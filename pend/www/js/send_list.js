var app = {
    // Application Constructor。アプリ起動時に実行する関数かな
    initialize: function() {
      //deviceready... ネイティブとHTMLのブリッジのために初期化を行う。その初期化で発火するのがこのイベント
      //ちなみにHTMLが読み込んでるときはDOMContentLoadedイベントが発火する
      //その次にload。いつも使ってるやつ。その後にdeviceready
      var settingBtn = document.querySelector("#setting");
      var searchBtn = document.querySelector("#search_button");
      settingBtn.onclick = function(){
        location.href ="home.html";
      }

      document.getElementById("user_name").innerHTML = sessionStorage.getItem('myname');
      document.getElementById("coin").innerHTML = sessionStorage.getItem('balance');
      let balance = sessionStorage.getItem('balance');


      document.getElementById("search_button").addEventListener('click', this.SearchUser.bind(this), false);
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
      let text = document.getElementById('search_word').value;
      if(text == ""){
        alert("入力してください");
        return;
      }
      document.getElementById("input_text").innerHTML = `${text}の検索結果`;

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
      xhr.open('GET', `https://growbalactive-pend.herokuapp.com/api/UserSearch?name=${text}`, false);
      // POST 送信の場合は Content-Type は固定.
      //openだけでは送れていない。sendをすることで送ったことになる
      xhr.send("");
      xhr.abort(); // 再利用する際にも abort() しないと再利用できないらしい. ←そういうことらしい
    },

    Total: function(value){
      let view = document.getElementById("view");
      let name = sessionStorage.getItem('myname');


      view.innerHTML = "";
      for(res of value){
        if(name == res.name)continue;
        view.innerHTML += `
          <div class="result">
            <p class="result_name" id="userA">${res.name}</p>
            <button type="button" class="result_btn" value=${res.name}>
                <img src="./img/enter.png">
            </button>
          </div>
        `
      }
      if(value.length <= 0 || view.innerHTML == "")view.innerHTML = "該当する名前はありませんｗ"
      let contents = document.getElementsByClassName('result_btn');
      for(i of contents) i.addEventListener('click', (e) => {app.changePage(e)});
    },

    changePage: function(e){
      let target;
      if(e.target.tagName == "IMG"){
        target = e.target.parentNode.value;
      }else{
        target = e.target.value;
      }
      sessionStorage.setItem("targetname", target);
      location.href = "./send_coin.html";
    }
};

app.initialize();
