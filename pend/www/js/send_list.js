//html内の要素を読み込む
var searchWord = document.querySelector('#search_word');
var searchBtn = document.querySelector('#search_btn');
var resultBtn = document.querySelector('.result_btn');

var resultUserA = document.querySelector('#userA');
var resultUserB = document.querySelector('#userB');

searchBtn.onclick = function(){
    if(window.confirm(searchWord.value +"で検索します。(未実装)")){
        console.log("検索しました。");
        
    }else{
        alert("キャンセルしました。");
    }    
}

/*
* ユーザー名にidをつける
*
*/ 
resultBtn.onclick = function(){
    if(window.confirm(resultUserA.value +"に送金しますか？")){
        location.href = './send_coin.html';
    }else{
        alert("キャンセルしました。");
    }   
}
