var topics = [
  "cats",
  "dogs",
  "babies",
  "fail",
  "surprise",
  "fear",
  "funny"
]


function printButton (t){
  var b = $('<button>');
  b.html(t);
  b.addClass('gifButton');
  b.attr('value', t);
  $('#buttons').append(b);
}

topics.forEach(printButton);

var searchTerm;
var queryURL;
var gifs = {};

function retrieveGifs () {
  $.ajax({url: queryURL, method: "GET"}).done(function(response){
    for (var i = 0; i < 10; i++){
      var newG = $('<img>');
      newG.addClass('gifBox');
      newG.data('still', response.data[i].images.original_still.url);
      newG.data('animate', response.data[i].images.original.url)
      newG.attr('src', newG.data('still'));

      $('#gifs').prepend(newG);
  }

  });
}

function ajaxCall (bClicked){
  searchTerm = bClicked;
  queryURL = 'http://api.giphy.com/v1/gifs/search?q=' + searchTerm + '&limit=10&api_key=dc6zaTOxFJmzC';
  retrieveGifs();
}


$(document).ready(function(){
  $('.gifButton').on('click', function(){
    $('#gifs').empty();
    ajaxCall($(this).val());
  });
});