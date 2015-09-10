$("#player_list").on('click', function(e) {
      console.log(token);
      $.ajax('http://football.myfantasyleague.com/2015/export?TYPE=players&L=&W=&JSON=1', {
        contentType: 'application/json',
        data: JSON.stringify({
          player: {
            name: $('#name').val(),
            position: $('#position').val(),
            team: $('#team').val()
          }
        }),
        dataType: 'json',
        method: 'POST',
        headers: {
         Authorization: 'Token token=' + token
       }
      }).done(function(data, textStatus, jqxhr) {
        $('#player-list').html(listTemplate({players:data}));


          console.log('Hey! You did it! Congrats! Now go do another');
      }).fail(function(jqxhr, textStatus, errorThrown) {
        $('#result').val('registration failed');
           console.log(textStatus);
      });
    });
