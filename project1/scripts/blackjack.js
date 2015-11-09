window.onload = function() {
  var deckOfCards = [];
  var cardCounter = -1;
  var playScore = 0;
  var dealScore = 0;

function makeDeck() {
  for (var i = 0; i < 52; i++) {
      deckOfCards[i]= { };
    }
  for (var j = 0; j < 49; j = j + 4) {
    deckOfCards[j].suit = 'Hearts';
    deckOfCards[j+1].suit = 'Spades';
    deckOfCards[j+2].suit = 'Clubs';
    deckOfCards[j+3].suit = 'Diamonds';
    }
  for (var k = 0; k < 4; k++) {
    deckOfCards[k].rank = 'Ace';
    deckOfCards[k+4].rank = 'King';
    deckOfCards[k+8].rank = 'Queen';
    deckOfCards[k+12].rank = 'Jack';
    deckOfCards[k+16].rank = 'Ten';
    deckOfCards[k+20].rank = 'Nine';
    deckOfCards[k+24].rank = 'Eight';
    deckOfCards[k+28].rank = 'Seven';
    deckOfCards[k+32].rank = 'Six';
    deckOfCards[k+36].rank = 'Five';
    deckOfCards[k+40].rank = 'Four';
    deckOfCards[k+44].rank = 'Three';
    deckOfCards[k+48].rank = 'Two';
    deckOfCards[k].worth = 11;
    deckOfCards[k+4].worth = 10;
    deckOfCards[k+8].worth = 10;
    deckOfCards[k+12].worth = 10;
    deckOfCards[k+16].worth = 10;
    deckOfCards[k+20].worth = 9;
    deckOfCards[k+24].worth = 8;
    deckOfCards[k+28].worth = 7;
    deckOfCards[k+32].worth = 6;
    deckOfCards[k+36].worth = 5;
    deckOfCards[k+40].worth = 4;
    deckOfCards[k+44].worth = 3;
    deckOfCards[k+48].worth = 2;
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
shuffle();

for (var i = 0; i < 52; i++) {
  console.log(deckOfCards[i])
}

function nextCard() {
  cardCounter = cardCounter + 1;
  return deckOfCards[cardCounter].rank + ' of ' + deckOfCards[cardCounter].suit;
  console.log('cardCounter');
};

var playerDraw = {
  domElement: null,
  initialize: function() {
    console.log('initializing component');
    this.domElement = document.createElement('li');
    playerArea.appendChild(this.domElement);
  },
  render: function() {
    this.domElement.innerHTML = nextCard();
  },
  addPlayerScore: function() {
    playScore = playScore + deckOfCards[cardCounter].worth;
  },
  returnPlayerScore: function() {
    playerScore.innerHTML = playScore;
  }
}


// var dealerDraw = { //Only need to put same picture or none up for dealer.
//   domElement: null,
//   initialize: function() {
//
//     this.domElement = document.createElement('li');
//     dealerArea.appendChild(this.domElement);
//   },
//   render: function() {
//     this.domElement.innerHTML = nextCard();
//   },
//   addDealerScore: function() {
//     dealScore = dealScore + deckOfCards[cardCounter].worth;
//   },
// }




var messages = document.createElement('li')
  messages.id = 'messages';

var hit = document.createElement('button');
  hit.id = 'hit';
  hit.innerHTML = 'HIT';

var stay = document.createElement('button');
  stay.id = 'stay';
  stay.innerHTML = 'STAY';

var playerScore = document.createElement('li');
  playerScore.id = 'playerScore';

var dealerArea = document.getElementsByClassName('game')[0];

var playerArea = document.getElementsByClassName('game')[2];

var statusScreen = document.getElementsByClassName('game')[1];

var btn = document.getElementById('playBlackjack');

hit.addEventListener('click', function() {
  if (playScore < 21) {
    playerDraw.initialize();
    playerDraw.render();
    playerDraw.addPlayerScore();
    playerDraw.returnPlayerScore();
  } else if (playScore == 21) {
    messages.innerHTML = 'You have 21!'
  } else {
    messages.innerHTML = 'You\'ve busted and can\'t hit!'
  }
});

console.log('0.4 ' + cardCounter);
function plDraw() {
  if (playScore < 21) {
    playerDraw.initialize();
    playerDraw.render();
    playerDraw.addPlayerScore();
    playerDraw.returnPlayerScore();
  } else if (playScore == 21) {
    statusScreen.innerHTML = 'You have 21!'
  } else {
    statusScreen.innerHTML = 'You\'ve busted and can\'t hit!'
  }
};

function deDraw() {
    nextCard();
    dealScore = dealScore + deckOfCards[cardCounter].worth;
}

stay.addEventListener('click', function() {
  while (dealScore < 17) {
    deDraw();
  }
  if (playScore > dealScore && playScore < 22) {
      statusScreen.innerHTML = 'Player Wins!';
    } else if (playScore < 22 && dealScore > 21) {
      statusScreen.innerHTML = 'Player Wins!';
    } else {
      statusScreen.innerHTML = 'Computer Wins!';
    }
});

btn.addEventListener('click', function(){
  dealerArea.id = 'dealerArea';
  playerArea.id = 'playerArea';
  statusScreen.id = 'statusScreen';
  statusScreen.appendChild(hit);
  statusScreen.appendChild(stay);
  statusScreen.appendChild(playerScore);
  statusScreen.appendChild(messages);
  btn.innerHTML = 'Nope';
  plDraw();
  console.log(playScore);
  console.log(dealScore);
  deDraw();
  console.log(playScore);
  console.log(dealScore);
  plDraw();
  console.log(playScore);
  console.log(dealScore);
  deDraw();
  console.log(playScore);
  console.log(dealScore);
});

}
