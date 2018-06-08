var app = {
    // Application Constructor
    initialize: function() {
      document.getElementById("torihiki").addEventListener('click', this.displayHello.bind(this), false);
      //  document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    displayHello: function(){
      //HTTP通信をする所
      var xhr = new XMLHttpRequest();

      // ハンドラの登録.
      xhr.onload = function() {
          switch ( xhr.readyState ) {
              case 4: // データ受信完了.
                  if( xhr.status == 200 || xhr.status == 304 ) {
                    console.log(xhr.responseText);
                      var data = xhr.responseText; // responseXML もあり
                      document.getElementById("coin").value = data;
                  } else {
                      console.log( 'Failed. HttpStatus: '+xhr.statusText );
                  }
                  break;
          }
      };
      xhr.open('GET', 'http://192.168.2.76:2525', false);
      xhr.send(null);
      xhr.abort(); // 再利用する際にも abort() しないと再利用できないらしい. ←そういうことらしい
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();
