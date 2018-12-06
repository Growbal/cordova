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
  xhr.open('GET', `https://growbalactive-pend.herokuapp.com/api/AdminLog`, false);
  xhr.send("");
  xhr.abort();
}


function VisibleLog(Log){
  let main = document.getElementById("logArea");
  for(i of Log){
    main.innerHTML += `
      <div class="aLog">
        <p id="send_user">${i.payman}</p>
        <p id="arrow">--></p>
        <p id="get_user">${i.resman}</p>
        <p id="comment">${i.reason}</p>
        <p id="send_pd">${i.money}</p>
        <p id="unit">pd</p>
        <p id="date">${i.trading_date}</p>
      </div>
    `
  }
}
