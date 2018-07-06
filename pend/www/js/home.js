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
	GoLink(3);
}
notificationBtn.onclick = function(){
	GoLink(4);
}

// 数字に対応したページへ移動する関数
function GoLink(num){
	if(num == 1){
		href = "./send_list.html";
	}else if(num == 2){
		href = "./not_found.html";
	}else if(num == 3){
		href = "./not_found.html";
	}else if(num == 4){
		href = "./not_found.html";
	}else{
		href = "./not_found.html";
	}
 	location.href = href;
}