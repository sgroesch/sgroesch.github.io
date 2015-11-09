window.onload = function() {
  console.log('hey this worked');



}


// Ask how many human and computer players and set number


// Ask names for players and set. Set generic Computer names

// Ask what teammate configuration is and set


//



// Make Deck and deal cards
var deckOfCards = [ ];
function makeDeck() {
  for (var i = 0; i < 24; i++) {
      deckOfCards[i]= { };
    }
  for (var j = 0; j < 21; j = j + 4) {
    deckOfCards[j].suit = 'hearts';
    deckOfCards[j+1].suit = 'spades';
    deckOfCards[j+2].suit = 'clubs';
    deckOfCards[j+3].suit = 'diamonds';
    }
  for (var k = 0; k < 4; k++) {
    deckOfCards[k].rank = 'ace';
    deckOfCards[k+4].rank = 'king';
    deckOfCards[k+8].rank = 'queen';
    deckOfCards[k+12].rank = 'jack';
    deckOfCards[k+16].rank = '10';
    deckOfCards[k+20].rank = '9';
  }
  };
makeDeck();

function shuffle() {
    for (var i = 0; i < deckOfCards.length; i++) {
      deckOfCards[i].ranNum = Math.random();
    }
    deckOfCards.sort(function(a, b) {
      return a.ranNum - b.ranNum;
    });
}


// Function to show background of card

function setImage(cardObject) {
  return 'styles/cards/' + cardObject.rank + '_of_' + cardObject.suit + '.png';
}

function setBackground(currentMove, cardObject) {
  var imgUrl = setImage(cardObject);
  $('#player'+currentMove+'GameArea').append('<img class="card" src='+imgUrl+'></img>')
}
