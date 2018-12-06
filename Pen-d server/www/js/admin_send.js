window.onload = function(){
  var xhr = new XMLHttpRequest();
  xhr.onload = function() {
      switch ( xhr.readyState ) {
          case 4:
              if( xhr.status == 200 || xhr.status == 304 ) {
                  if(JSON.parse(xhr.response).length){
                    VisibleLog(JSON.parse(xhr.response));
                  };
              } else {
                  console.log( 'Failed. HttpStatus: '+ xhr.statusText );
              }
              break;
      }
  };
  xhr.open('GET', `https://growbalactive-pend.herokuapp.com/api/AdminList`, false);
  xhr.send("");
  xhr.abort();
}


function VisibleLog(Log){
  console.log(Log);
  let main = document.getElementById("logArea");
  for(i of Log){
    main.innerHTML += `
    <div class="panel">
      <p id="user_name">
        <span class="num">${i.user_id - 1}</span>
        <span class="name">${i.name}</span>
        </p>

        <div style="margin-left:100px;">
        <button type="button" class="pend100"onclick="pendCountUp(100, this);">100pd</button>
        <button type="button" class="pend300"onclick="pendCountUp(300, this);">300pd</button>
        <button type="button" class="pend500"onclick="pendCountUp(500, this);">500pd</button>
        <button type="button" class="cancel" onclick="reset(this)">キャンセル</button>
        </div>
        <p style="text-align:right;">合計: <span class="pendOutput">0</span></p>
    </div><hr>
    `
  }
}

function pendCountUp(value, e) {
  let num = parseInt(e.parentNode.parentNode.lastElementChild.lastElementChild.innerText);
  num += value;
  e.parentNode.parentNode.lastElementChild.lastElementChild.innerText = num;
  }
function reset(e){
  e.parentNode.parentNode.lastElementChild.lastElementChild.innerText = 0;
}

function aiueo(){
  // 「OK」時の処理開始 ＋ 確認ダイアログの表示
	if(window.confirm('この内容で送信します')){
		 send();
	}
	// 「OK」時の処理終了
	// 「キャンセル」時の処理開始
	else{
		  window.alert('キャンセルされました'); // 警告ダイアログを表示
	// }
	// 「キャンセル」時の処理終了
}
}

async function send(){
  let data = document.getElementsByClassName('panel');
  for(i of data){
    let p = {};
    if(parseInt(i.lastElementChild.lastElementChild.innerText)){
      p.num = parseInt(i.lastElementChild.lastElementChild.innerText);
      p.id = parseInt(i.firstElementChild.firstElementChild.innerText) + 1;
      await sendlist(p);
    }
  }
}

function sendlist(list){
  console.log(list);
  return new Promise(resolve => {
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
        switch ( xhr.readyState ) {
            case 4: // データ受信完了.
                if( xhr.status == 200 || xhr.status == 304 ) {
                    resolve();
                } else {
                    console.log( 'Failed. HttpStatus: '+ xhr.statusText );
                }
                break;
        }
    };

    //どこのサーバーに送るかを指定する
    //サーバーへの送り方は２種類ある。 GETとPOSTの２種類がある。
    //GETはフロントからデータを送らないリクエスト。POSTはフロントからデータを送るリクエスト
    xhr.open('GET', `https://growbalactive-pend.herokuapp.com/api/AdminTrading?id=${list.id}&value=${list.num}`, false);
    // POST 送信の場合は Content-Type は固定.
    //openだけでは送れていない。sendをすることで送ったことになる
    xhr.send("");
    xhr.abort(); // 再利用する際にも abort() しないと再利用できないらしい. ←そういうことらしい
  });
}
