  var pub = io.connect('http://localhost:3000/pub');

  function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }


  function replaceURLWithHTMLLinks(text) {
    var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    return text.replace(exp,"<a href='$1' target='_blank'>$1</a>"); 
  }

  pub.on('connected_users', function(data) {
    console.log(data);
  });

  // on connection to server, ask for user's name with an anonymous callback
  pub.on('connect', function(){
    // call the server-side function 'adduser' and send one parameter (value of prompt)
    pub.emit('adduser', prompt("What's your name?"));
  });

  // listener, whenever the server emits 'updatechat', this updates the chat body
  pub.on('updatechat', function (username, data) {
    var date = new Date();
    var urls = replaceURLWithHTMLLinks(data);
      $('#conversation').prepend('[' + formatAMPM(date) + '] <b style="color: #0044cc;">'+username + ':</b> ' + urls + '<br>');
  });

  // listener, whenever the server emits 'updateusers', this updates the username list
  pub.on('updateusers', function(data) {
    $('#users').empty();
    $.each(data, function(key, value) {
      $('#users').append('<p>' + key + '</p>');
    });
  });

  // on load of page
  $(function(){
    // when the client clicks SEND
    $('#datasend').click( function() {
      var message = $('#data').val();
      $('#data').val('');
      $('#data').select();
      // tell server to execute 'sendchat' and send along one parameter
      pub.emit('sendchat', message);
    });

    // when the client hits ENTER on their keyboard
    $('#data').keypress(function(e) {
      if(e.which == 13) {
        $(this).blur();
        $('#datasend').focus().click();
      }
    });
  });