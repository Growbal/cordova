// function
//   for ( var i = 1 ; i<30 ; i++ ){
//     var send='<button type="button"onclick="pendCountUp(100,i);">100pd</button>'
//       +'<button type="button"onclick="pendCountUp(300,i);">300pd</button>'
//       +'<button type="button"onclick="pendCountUp(500,i);">500pd</button>'
//       +'<button type="button"onclick="reset()">キャンセル</button>'}
let result = 0;
let result1 = 0;
let result2 = 0;
let result3 = 0;
let result4 = 0;
let result5 = 0;
let result6 = 0;
let result7 = 0;
let result8 = 0;
let result9 = 0;
let result10 = 0;

name = document.getElementById('name').innerHTML;
name1 = document.getElementById('name1').innerHTML;
name2 = document.getElementById('name2').innerHTML;
name3 = document.getElementById('name3').innerHTML;
name4 = document.getElementById('name4').innerHTML;


function pendCountUp(value) {
  result += value;
  	document.getElementById("pendOutput").innerHTML = result;
  }
function reset(){
  result = 0;
  document.getElementById('pendOutput').innerHTML = 0;
}
function pendCountUp1(value) {
  result1 += value;
  	document.getElementById("pendOutput1").innerHTML = result1;
  }
function reset1(){
  result1 = 0;
  document.getElementById('pendOutput1').innerHTML = 0;
}
function pendCountUp2(value) {
  result2 += value;
  	document.getElementById("pendOutput2").innerHTML = result2;
  }
function reset2(){
  result2 = 0;
  document.getElementById('pendOutput2').innerHTML = 0;
}
function pendCountUp3(value) {
  result3 += value;
  	document.getElementById("pendOutput3").innerHTML = result3;
  }
function reset3(){
  result3 = 0;
  document.getElementById('pendOutput3').innerHTML = 0;
}
function pendCountUp4(value) {
  result4 += value;
  	document.getElementById("pendOutput4").innerHTML = result4;
  }
function reset4(){
  result4 = 0;
  document.getElementById('pendOutput4').innerHTML = 0;
}
function pendCountUp5(value) {
  result5 += value;
  	document.getElementById("pendOutput5").innerHTML = result5;
  }
function reset5(){
  result5 = 0;
  document.getElementById('pendOutput5').innerHTML = 0;
}

function aiueo(){
  // 「OK」時の処理開始 ＋ 確認ダイアログの表示
	if(window.confirm('この内容で送信します。\n'+name+":" + result+'\n'+ name1+ ":" + result1+'\n'+name2+ ":" + result2+'\n'+name3+ ":" + result3+'\n'+name4+ ":" + result4)){
		 if(window.alert("送信されました。")){

     }// example_confirm.html へジャンプ
	}
	// 「OK」時の処理終了
	// 「キャンセル」時の処理開始
	else{
		  window.alert('キャンセルされました'); // 警告ダイアログを表示
	// }
	// 「キャンセル」時の処理終了
}
}
