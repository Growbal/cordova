// html内の要素を読み込む
var soukinBtn = document.querySelector("#soukin");
var torihikiBtn = document.querySelector("#torihiki");
var setteiBtn = document.querySelector("#settei");
var tuutiBtn = document.querySelector("#tuuti");

// 数値
var coinNum = document.querySelector("#coin")

// ボタンが押されたときに関数を実行する
soukinBtn.onclick = function(){
	GoLink(1);
}
torihikiBtn.onclick = function(){
	GoLink(2);
}
 //テストで、innerHTMlで数値をいじるようにする
setteiBtn.onclick = function(){
	coinNum.innerHTML  = "1000000"
}
tuutiBtn.onclick = function(){
	coinNum.innerHTML  = "0"
}

// 数字に対応したページへ移動する関数
function GoLink(no){
	if(no == 1){
		href = "./send_list.html";
	}else if(no == 2){
		href = "./send_coin.html";
	}else if(no == 3){
		href = "./send_coin.html";
	}else if(no == 4){
		href = "./send_coin.html";
	}else{
		href = "./send_coin.html";
	}
 	location.href = href;
}