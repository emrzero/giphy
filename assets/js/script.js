var topics = [
  "cats",
  "dogs",
  "babies",
  "fail",
  "surprise",
  "fear",
  "funny"
]


function initPage(){
  topics.forEach(printButton);
  btnEventListener();
}


function printButton (t){
  var b = $('<button>');
  b.html(t);
  b.addClass('gifButton');
  b.attr('value', t);
  $('#buttons').append(b);
}


var searchTerm;
var queryURL;
var gifs = {};

function retrieveGifs () {
  $.ajax({url: queryURL, method: "GET"}).done(function(response){
    for (var i = 0; i < 10; i++){

      var newDiv = $('<div>');
      newDiv.addClass('gifContainer');

      var newP = $('<p>');
      newP.text('Rating: ' + response.data[i].rating.toUpperCase());
      newDiv.append(newP);

      var newG = $('<img>');
      newG.addClass('gifBox');
      newG.data('state', 'still');
      newG.data('still', response.data[i].images.fixed_height_still.url);
      newG.data('animate', response.data[i].images.fixed_height.url)
      newG.attr('src', newG.data('still'));
      newDiv.append(newG);

      $('#gifs').append(newDiv);
  }
    gifEventListener();

  });
}

function ajaxCall (bClicked){
  searchTerm = bClicked;
  queryURL = 'http://api.giphy.com/v1/gifs/search?q=' + searchTerm + '&limit=10&api_key=dc6zaTOxFJmzC';
  retrieveGifs();


}

function btnEventListener(){
  $('.gifButton').on('click', function(){
    $('#gifs').empty();
    ajaxCall($(this).val());
  });
}


function gifEventListener (){
  $('.gifBox').on('click', function(){
    var state = $(this).data('state');

    if (state === 'still'){
      $(this).data('state', 'animate');
      $(this).attr('src', $(this).data('animate'));
    }  else {
      $(this).data('state', 'still');
      $(this).attr('src', $(this).data('still'));
    }
  });
}

$('#btnAdd').on('click', function(){
  topics.push($('#txtAdd').val());
  $('#buttons').empty();
  initPage();
  return false;
});

initPage();
