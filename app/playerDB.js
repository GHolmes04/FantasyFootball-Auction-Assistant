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

  function searchPicky(attributes, values, cmps) {
    var numConstraints = Math.min(attributes.length, values.length);
    var results = [];

    players.forEach(function(currVal) {
      var match = true;

      for(var index = 0; index < numConstraints; index++) {
        if(cmps[index] instanceof Function) {
          match &= cmps[index](currVal[attributes[index]], values[index]);
        } else {
          match &= currVal[attributes[index]] === values[index];
        }
      }

      if(match) {
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
    },
    searchComposite : searchPicky
  };

  $.ajax({
    url: 'http://localhost:3000/players',
    type: 'GET',
    dataType: 'json'
  })
  .done(function(response) {
    players = response.players;
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
