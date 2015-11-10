window.onload = function() {
  console.log('hey this worked');



}


// Ask how many human and computer players and set number

// Ask names for players and set. Set generic Computer names

// Ask what teammate configuration is and set


//



// Make Deck and deal cards
var deckOfCards = [ ];
var handOne = [];
var handTwo = [];
var handThree = [];
var handFour = [];
var teamOneHandScore;
var teamTwoHandScore;
var teamOneTotalScore;
var teamTwoTotalScore;
var trump;
var dealer;
var dummy;
var maker;

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

function deal() {
      shuffle();
      handOne = [deckOfCards[0], deckOfCards[1], deckOfCards[2], deckOfCards[3], deckOfCards[4]];
      handTwo = [deckOfCards[5], deckOfCards[6], deckOfCards[7], deckOfCards[8], deckOfCards[9]];
      handThree = [deckOfCards[10], deckOfCards[11], deckOfCards[12], deckOfCards[13], deckOfCards[14]];
      handFour = [deckOfCards[15], deckOfCards[16], deckOfCards[17], deckOfCards[18], deckOfCards[19]];
      pickUp = deckOfCards[23];
}

// Function to show background of card

function setImage(cardObject) {
  return 'styles/cards/' + cardObject.rank + '_of_' + cardObject.suit + '.png';
}

function setBackground(currentMove, cardObject) {
  var imgUrl = setImage(cardObject);
  $('#player'+currentMove+'GameArea').append('<img class="card" src='+imgUrl+'></img>')
}

//Bidding: Pick up to set trump, pass,




function nextDealer() {
  dealer = (dealer%4 + 1);
}

function nextTurn(){
  currentTurn = (currentTurn%4 +1);
  if (currentTurn == dummy) {
    currentTurn = (currentTurn%4 +1);
  }
}

function setDummy(x) {
  if (x == 1) {
    dummy = 3;
  } else if (x == 2) {
    dummy = 4;
  } else if (x == 3) {
    dummy = 1;
  } else if (x == 4) {
    dummy = 2;
  } else {
    dummy = 0;
  }
}

function setGoingAlone(x) {
    if (x == 1 || x == 3){
    goAloneTeamOne = true;
  } else if (x == 2 || x == 4) {
    goAloneTeamTwo = true;
  } else {
    goAloneTeamOne = false;
    goAloneTeamTwo = false;
  }
}

function setMaker(x) {
  if (x == 1 || x == 3){
    makerTeamOne = true;
    makerTeamTwo = false;
  } else if (x == 2 || x == 4){
    makerTeamOne = false;
    makerTeamTwo = true;
  }
}

function bidding(){
  //Start with next person to shuffler
  //bidPass or bidPickup
  //bidChooseTrump and bid startOver hand
}
function bidPass(){
  //Move whos turn to bid to next person
}

function bidPickUp(x, y) {
  //var x = user input
  //var y = current player
  //bidPickUp(x, y);
  trump = pickUp.suit;
  x = pickUp;
  turn = y;
  return x;
}

// 4. Playing

function playHand() {

}

function chooseCard(y) {
  // var y = user input;
  var x =
}

// 5. Keep Score and Declare winner


function trickScore(x) {
  if (x == 1 || x == 3) {
    var teamOneHandScore = teamOneHandScore + 1;
  } else if (x == 2 || x == 4) {
    var teamTwoHandScore = teamTwoHandScore + 1;
  }
}

function addTotalScore(handsWon, goAlone, maker) {
  var score;
  if (goAlone == true) {
    if (maker == true) {
      if (handsWon == 5) {
        score = 4;
      } else if (handsWon > 2) {
        score = 1;
      } else {
        score = 0;
      }
    } else {
        if (handsWon > 2) {
          score = 4;
        } else {
          score = 0;
        }
    }
  } else {
    if (maker == true) {
      if (handsWon == 5) {
        score = 2;
      } else if (handsWon > 2) {
        score = 1;
      } else {
        score = 0;
      }
    } else {
      if (handsWon > 2) {
        score = 2;
      } else {
        score = 0;
      }
    }
  } return score;
}


function handScore(scoringTeam) {
  if (scoringTeam = 'Team One') {
    teamOneScore = teamOneScore + 1;
  } else if (scoringTeam = 'Team Two') {
    teamTwoScore = teamTwoScore + 1;
  } else {

  }
}


function resetHand() {
  handOne = [];
  handTwo = [];
  handThree = [];
  handFour = [];
  teamOneHandScore = 0;
  teamTwoHandScore = 0;
  dummy = 0;
  goAloneTeamOne = false;
  goAloneTeamTwo = false;
}

function resetGame() {
  resetHand();
  teamOneScore = 0;
  teamTwoScore = 0;
}

function playGame()
