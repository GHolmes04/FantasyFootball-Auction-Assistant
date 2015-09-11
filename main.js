'use strict';
//frag variables create drop down menu for position and team
var frag = document.createDocumentFragment();

$(document).ready(function(){
  PosDB.forEach( function( pos, index, array ) {

    var newOptionItem = document.createElement( "option" );


    newOptionItem.value = newOptionItem.innerText = pos;


    frag.appendChild( newOptionItem );

  });

  $("#select_positions" )[ 0 ].appendChild( frag );

});

var frag2 = document.createDocumentFragment();

$(document).ready(function(){
  teamsDB.forEach( function( team, index, array ) {

    var newOptionItem = document.createElement( "option" );


    newOptionItem.value = newOptionItem.innerText = team;


    frag.appendChild( newOptionItem );

  });

  $("#select_teams" )[ 0 ].appendChild( frag );

  $("#submitPlayer").on('click', function (){
    var pSelVal = {
        name: $('input[name="selectPlayer"]').val(),
        salary: $('input[id= "winning-bid"]').val(),
        contractLength: $('input[id= "years"]').val()
    };
    var summaryHtml = View.Templates.summary({
      playerSelected: pSelVal
    });
    console.log('player data is: ', pSelVal );
    $("#summary-list").append(summaryHtml);
  });


  //code to search through players with name pos and/or team

  $("#findPlayer").on('click', function(){
    console.log("You clicked find player");
    var name = $('#playersName').val();
    var pos = $('#select_positions').val();
    var team = $('#select_teams').val();

    pos = pos instanceof Array ? pos[0] : pos;
    team = team instanceof Array ? team[0] : team;

    var attributes = [];
    var values = [];
    var cmps = [];
    if( name !== ''){
      attributes.push('name');
      values.push(name);

      cmps.push(function nameCmp(a, b) {
        return a.indexOf(b) > -1 ? true : false;
      });
    }
    if (pos !== null){
      attributes.push('position');
      values.push(pos);
    }
    if (team !== null){ // if (team)
      attributes.push('team');
      values.push(team);
    }
    var searchResults = PlayerDB.searchComposite(attributes, values, cmps);
    console.log(searchResults);
    console.log(attributes, values, cmps);

    var playerSearchHtml = View.Templates.nomination({players: searchResults});
    $("#posibleNominations").html(playerSearchHtml);



});
    $('#findLeague').on('click', function(){
    console.log('you click findLeague button');
    $.ajax('http://localhost:3000/franchises',{
      type: 'GET',
      dataType: 'json'
    })
    .done(function(result) {
      result.franchises.forEach(function(franchise) {
        $("#select_franchise").append( '<option>' + franchise.name + '</option>');
      });
    })
    .fail(function() {
      console.log("error");
    });

    });

  });







