window.onload = function() {
  console.log('hey this worked');
  makeDeck();
  deal();
}


// Ask how many human and computer players and set number

// Ask names for players and set. Set generic Computer names

// Ask what teammate configuration is and set

// Make Deck and deal cards
var deckOfCards = [];
var player1 = {
  playerOrder: 1,
  hand: [],
  goAlone: false,
  dummy: false};
var player2 = {
  playerOrder: 2,
  hand: [],
  goAlone: false,
  dummy: false};
var player3 = {
  playerOrder: 3,
  hand: [],
  goAlone: false,
  dummy: false};
var player4 = {
  playerOrder: 4,
  hand: [],
  goAlone: false,
  dummy: false};
var teamOneHandScore;
var teamTwoHandScore;
var teamOneTotalScore;
var teamTwoTotalScore;
var trump;
var oppositeTrump;
var maker;
var currentMove = {
  playerOrder: null,
  hand: [null, null, null, null, null],
  goAlone: null,
  dummy: null};
var dealer = 1;


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
    deckOfCards[k].rankNum = 6;
    deckOfCards[k+4].rankNum = 5;
    deckOfCards[k+8].rankNum = 4;
    deckOfCards[k+12].rankNum = 3;
    deckOfCards[k+16].rankNum = 2;
    deckOfCards[k+20].rankNum = 1;
  }
  };

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
      for (var i = 0; i < 5; i++) {
        deckOfCards[i].cardOwner = 1;
        deckOfCards[i].cardOwnerOrder = i+1;
        deckOfCards[i+5].cardOwner = 2;
        deckOfCards[i+5].cardOwnerOrder = i+1;
        deckOfCards[i+10].cardOwner = 3;
        deckOfCards[i+10].cardOwnerOrder = i+1;
        deckOfCards[i+15].cardOwner = 4;
        deckOfCards[i+15].cardOwnerOrder = i+1;
      }
      player1.hand = [deckOfCards[0], deckOfCards[1], deckOfCards[2], deckOfCards[3], deckOfCards[4]];
      for (var i = 0; i < player1.hand.length; i++) {
        renderHands(player1, i);
      };
      player2.hand = [deckOfCards[5], deckOfCards[6], deckOfCards[7], deckOfCards[8], deckOfCards[9]];
      for (var i = 0; i < player2.hand.length; i++) {
        renderHands(player2, i);
      }
      player3.hand = [deckOfCards[10], deckOfCards[11], deckOfCards[12], deckOfCards[13], deckOfCards[14]];
      for (var i = 0; i < player3.hand.length; i++) {
        renderHands(player3, i);
      }
      player4.hand = [deckOfCards[15], deckOfCards[16], deckOfCards[17], deckOfCards[18], deckOfCards[19]];
      for (var i = 0; i < player4.hand.length; i++) {
        renderHands(player4, i);
      }
      pickUp = deckOfCards[23];
      renderPickUp(pickUp)
}

// Function to show background of card

function imgUrl (card) {
  return 'styles/cards/' + card.rank + '_of_' + card.suit + '.png';
}

function renderPickUp(render) {
  $('#middleCard').append('<img class="card" src='+imgUrl(render)+'></img>')
}

function renderHands(whichPlayersHand, inc) {
  $('#player'+whichPlayersHand.playerOrder+'GameArea').append('<img class="card" id="player'+whichPlayersHand.playerOrder+'HandCard'+(inc + 1)+'" src='+imgUrl(whichPlayersHand.hand[inc])+'></img>');
}

// Bidding: Pick up to set trump, pass,

function nextDealer() {
  dealer = (dealer%4 + 1);
}

function nextTurn(){
  currentMove = (currentMove%4 +1);
  if (currentMove == dummy) {
    currentMove = (currentMove%4 +1);
  }
}

function setGoingAloneAndDummy(currentMove) {
  switch (currentMove.playerOrder) {
    case 1: player1.goAlone = true;
            player3.dummy = true;
      break;
    case 2: player2.goAlone = true;
            player4.dummy = true;
      break;
    case 3: player3.goAlone = true;
            player1.dummy = true;
      break;
    case 4: player4.goAlone = true;
            player2.dummy = true;
      break;
    default: console.log('Setting the goAlone function messed up');
  }
}

function setMaker(currentMove) {
  if (currentMove == 1 || currentMove == 3){
    makerTeamOne = true;
    makerTeamTwo = false;
  } else if (currentMove == 2 || currentMove == 4){
    makerTeamOne = false;
    makerTeamTwo = true;
  }
}

function setTrump(trump) {
  var oppositeTrump;
  switch (trump) {
    case 'hearts': oppositeTrump = 'diamonds';
      break;
    case 'diamonds': oppositeTrump = 'hearts';
      break;
    case 'spades': oppositeTrump = 'clubs';
      break;
    case 'clubs': oppositeTrump = 'spades';
      break;
    default: console.log('There was an error setting oppositeTrump');
  }
  for (var i = 0; i < 24; i++) {
    if (deckOfCards[i].suit == trump && deckOfCards[i].rank == 'jack') {
      deckOfCards[i].trump = true;
      deckOfCards[i].rankNum = 8;
    } else if (deckOfCards[i].suit == trump) {
      deckOfCards[i].trump = true;
    } else if (deckOfCards[i].suit == oppositeTrump && deckOfCards[i].rank == 'jack') {
      deckOfCards[i].trump = true;
      deckOfCards[i].rankNum = 7;
    } else {
      deckOfCards[i].trump = false;
    }
  }
}

function bidding(){
  while (trump == '') {

  }
}

function bidPass(){

 }

function bidPickUp() {
  trump = pickUp.suit;
  switch(dealer) {
    case 1: //dealer switches card
      break;
    case 2:
      break;
    case 3:
      break;
    case 4:
      break;
    default: console.log('There was an error with bidPickUp');
  }
}

// 4. Playing


function setClickFunctionPlay(currentMove){
  $('#player'+currentMove.playerOrder+'HandCard1').click(function(){
        if (allowedToPlayCard(currentMove) == true) {
            $('#player'+currentMove.playerOrder+'HandCard1').appendTo('#player'+currentMove.playerOrder+'PlayedCard')
            return true;
        } else {
            return false;
        }
  });
  $('#player'+currentMove.playerOrder+'HandCard2').click(function(){
        if (allowedToPlayCard(currentMove) == true) {
            $('#player'+currentMove.playerOrder+'HandCard2').appendTo('#player'+currentMove.playerOrder+'PlayedCard')
            return true;
        } else {
            return false;
        }
  });
  $('#player'+currentMove.playerOrder+'HandCard3').click(function(){
        if (allowedToPlayCard(currentMove) == true) {
            $('#player'+currentMove.playerOrder+'HandCard3').appendTo('#player'+currentMove.playerOrder+'PlayedCard')
            return true;
        } else {
            return false;
        }
  });
  $('#player'+currentMove.playerOrder+'HandCard4').click(function(){
        if (allowedToPlayCard(currentMove) == true) {
            $('#player'+currentMove.playerOrder+'HandCard4').appendTo('#player'+currentMove.playerOrder+'PlayedCard')
            return true;
        } else {
            return false;
        }
  });
  $('#player'+currentMove.playerOrder+'HandCard5').click(function(){
        if (allowedToPlayCard(currentMove) == true) {
            $('#player'+currentMove.playerOrder+'HandCard5').appendTo('#player'+currentMove.playerOrder+'PlayedCard')
            return true;
        } else {
            return false;
        }
  });
}

function allowedToPlayCard(currentMove, whichCard){
    if (currentMove.playerOrder == dealer) {
      return true;
    } else if (currentMove.hand[whichCard].suit == firstDealtSuit) {
      return true;
    } else if (haveDealtSuitInHand(currentMove) == true) {
      return true;
    } else {
      return false;
    }
}

function haveDealtSuitInHand(currentMove) {
    for (var i = 0; i < 5; i++) {
      if (currentMove.hand[i].suit == firstDealtSuit && currentMove.hand[i].played == false) {
        return false;
      } else {
        return true;
      }
    }
}

function playHand() {
  playFirstCard();
  if (dummy == 0) {
    for (var i = 0; i < 3; i++) {
      playCard();
      nextTurn();
    }
  } else {
    for (var i = 0; i < 2; i++) {
      playCard();
      nextTurn();
    }
  }
  currentMove = currentWinningHand.cardOwner;
}

function playFirstCard(dealer) {
  currentHand = hand+''
  setClickFunctionPlay(dealer);
  currentWinningHand =
  firstDealtSuit = currentWinningHand.suit;
}

function playCard() {
  checkHandWinner();
}

function checkHandWinner(currentWinningHand, newChallenger) {
  if (currentWinningHand.trump == true && newChallenger.trump == false) {
    currentWinningHand = currentWinningHand;
    nextTurn(); // Figure out
  } else if (currentWinningHand.trump == false && newChallenger.trump == true) {
    currentWinningHand = newChallenger;
    nextTurn(); // Figure out
  } else if (currentWinningHand.trump == true && currentWinningHand.trump == true) {
    checkHigherCard(currentWinningHand, newChallenger);
  } else {
    checkDealtSuit(currentWinningHand, newChallenger);
  }
}

function checkDealtSuit(currentWinningHand, newChallenger) {
  if (newChallenger.suit != firstDealtSuit){
    currentWinningHand = currentWinningHand;
  } else {
    checkHigherCard(currentWinningHand, newChallenger);
  }
}

function checkHigherCard(currentWinningHand, newChallenger) {
  if (currentWinningHand.rankNum > newChallenger.rankNum) {
    currentWinningHand = currentWinningHand;
  } else {
    currentWinningHand = newChallenger;
  }
}

function trickScore(currentWinningHand) {
  if (currentWinningHand == 1 || currentWinningHand == 3) {
    var teamOneHandScore = teamOneHandScore + 1;
  } else if (currentWinningHand == 2 || currentWinningHand == 4) {
    var teamTwoHandScore = teamTwoHandScore + 1;
  }
}

// 5. Keep Score and Declare winner



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


function resetHand() {
  player1.hand = [];
  player2.hand = [];
  player3.hand = [];
  player4.hand = [];
  teamOneHandScore = 0;
  teamTwoHandScore = 0;
  dummy = 0;
  goAloneTeamOne = false;
  goAloneTeamTwo = false;
  for (var i = 0; i < 24; i++) {
    deckOfCards[i].cardOwner = 0;
  }
}

function resetGame() {
  resetHand();
  teamOneScore = 0;
  teamTwoScore = 0;
}
