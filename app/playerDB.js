var PlayerDB = (function playerFakeDBIIFE() {
  var players;

  function searchPlayers(attribute, value, cmp) {
    var results = [];

    players.forEach(function(currVal) {
      if(cmp instanceof Function && cmp(currVal[attribute], value)) {
        results.push(currVal);
      } else if(currVal[attribute] === value) {
        results.push(currVal);
      }
    });

    return results;
  }

  var db = {
    searchByName : function(name) {
      return searchPlayers('name', name, function cmp(a, b) {
        return a.indexOf(b) > -1 ? true : false;
      });
    },
    searchByPosition : function(pos) {
      return searchPlayers('position', pos);
    },
    searchByTeam : function(team) {
      return searchPlayers('team' , team);
    }
  };

  $.ajax({
    url: 'http://localhost:3000/players',
    type: 'GET',
    dataType: 'json'
  })
  .done(function(response) {
    players = response;
  })
  .fail(function() {
    db.searchByName = db.searchByPosition = db.searchByTeam = function() {
      throw new Error("PlayerDB failed to retrieve player data.");
    };
  });

  // ajax request
    // success: assign stuff
    // failure: overwrite db methods to throw
  return db;
})();
