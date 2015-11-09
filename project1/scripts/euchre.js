// 1. Declare card and hand variables
var deckOfCards = [aceSpades, aceHearts, aceClubs, aceDiamonds, kingSpades, kingHearts, kingClubs, kingDiamonds, queenSpades, queenHearts, queenDiamonds, queenClubs, jackSpades, jackHearts, jackDiamonds, jackClubs, tenSpades, tenHearts, tenDiamonds, tenClubs, nineSpades, nineHearts, nineDiamonds, nineClubs];
var handOne = [];
var handTwo = [];
var handThree = [];
var handFour = [];
var teamOneHandScore;
var teamTwoHandScore;
var teamOneScore;
var teamTwoScore;


var pickUp;
var trump = '';
var turn;
var dealer = 1;
var currentTurn = 1;
var handStart;
var dummy;


// 2. Shuffling and Dealing cards

function deal() {
      shuffle();
      handOne = [deckOfCards[0], deckOfCards[1], deckOfCards[2], deckOfCards[3], deckOfCards[4]];
      handTwo = [deckOfCards[5], deckOfCards[6], deckOfCards[7], deckOfCards[8], deckOfCards[9]];
      handThree = [deckOfCards[10], deckOfCards[11], deckOfCards[12], deckOfCards[13], deckOfCards[14]];
      handFour = [deckOfCards[15], deckOfCards[16], deckOfCards[17], deckOfCards[18], deckOfCards[19]];
      pickUp = deckOfCards[23];
}

function shuffle() {
    for (var i = 0; i < deckOfCards.length; i++) {
      deckOfCards[i].ranNum = Math.random();
    }
    deckOfCards.sort(function(a, b) {
      return a.ranNum - b.ranNum;
    });
}

// 3. Bidding
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

// Variable for cards
var aceSpades = {
  suit: 'Spades',
  rank: 'Ace',
  img: ' ',
};

var aceHearts = {
  suit: 'Hearts',
  rank: 'Ace',
  img: ' '
};

var aceDiamonds = {
  suit: 'Diamonds',
  rank: 'Ace',
  img: ' '
};

var aceClubs = {
  suit: 'Clubs',
  rank: 'Ace',
  img: ' '
};

var kingSpades = {
  suit: 'Spades',
  rank: 'King',
  img: ' '
};

var kingHearts = {
  suit: 'Hearts',
  rank: 'King',
  img: ' '
};

var kingDiamonds = {
  suit: 'Diamonds',
  rank: 'King',
  img: ' '
};

var kingClubs = {
  suit: 'Clubs',
  rank: 'King',
  img: ' '
};

var queenSpades = {
  suit: 'Spades',
  rank: 'Queen',
  img: ' '
};

var queenHearts = {
  suit: 'Hearts',
  rank: 'Queen',
  img: ' '
};

var queenDiamonds = {
  suit: 'Diamonds',
  rank: 'Queen',
  img: ' '
};

var queenClubs = {
  suit: 'Clubs',
  rank: 'Queen',
  img: ' '
};

var jackSpades = {
  suit: 'Spades',
  rank: 'Jack',
  img: ' '
};

var jackHearts = {
  suit: 'Hearts',
  rank: 'Jack',
  img: ' '
};

var jackDiamonds = {
  suit: 'Diamonds',
  rank: 'Jack',
  img: ' '
};

var jackClubs = {
  suit: 'Clubs',
  rank: 'Jack',
  img: ' '
};

var tenSpades = {
  suit: 'Spades',
  rank: 'Ten',
  img: ' '
};

var tenHearts = {
  suit: 'Hearts',
  rank: 'Ten',
  img: ' '
};

var tenDiamonds = {
  suit: 'Diamonds',
  rank: 'Ten',
  img: ' '
};

var tenClubs = {
  suit: 'Clubs',
  rank: 'Ten',
  img: ' '
};

var nineSpades = {
  suit: 'Spades',
  rank: 'Nine',
  img: ' '
};

var nineHearts = {
  suit: 'Hearts',
  rank: 'Nine',
  img: ' '
};

var nineDiamonds = {
  suit: 'Diamonds',
  rank: 'Nine',
  img: ' '
};

var nineClubs = {
  suit: 'Clubs',
  rank: 'Nine',
  img: ' '
};
