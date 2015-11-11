window.onload = function() {
  console.log('hey this worked');
  makeDeck();
  deal();
  setTrump(trump);
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
  dummy: false,
  controller: null};
var player2 = {
  playerOrder: 2,
  hand: [],
  goAlone: false,
  dummy: false,
  controller: null};
var player3 = {
  playerOrder: 3,
  hand: [],
  goAlone: false,
  dummy: false,
  controller: null};
var player4 = {
  playerOrder: 4,
  hand: [],
  goAlone: false,
  dummy: false,
  controller: null};
var teamOneHandScore;
var teamTwoHandScore;
var teamOneTotalScore;
var teamTwoTotalScore;
var trump = 'hearts';
var oppositeTrump;
var maker;
var currentMove = {
  playerOrder: null,
  hand: [null, null, null, null, null],
  goAlone: null,
  dummy: null,
  controller: null};
var dealer = 1;
var firstDealtSuit;
var currentWinningTrick;
var newChallenger;
var handStarter = 1;

function makeDeck() {
  for (var i = 0; i < 24; i++) {
      deckOfCards[i]= {played: false};
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

function nextTurn(currentMove){
  switch (currentMove.playerOrder) {
    case 1: if (player2.dummy == true) {
              currentMove = player3;
            } else {
              currentMove = player2;
            };
        break;
    case 2: if (player3.dummy == true) {
              currentMove = player4;
            } else {
              currentMove = player3;
            };
        break;
    case 3: if (player4.dummy == true) {
              currentMove = player1;
            } else {
              currentMove = player4;
            };
        break;
    case 4: if (player1.dummy == true) {
              currentMove = player2;
            } else {
              currentMove = player1;
            };
        break;
    default: console.log('The nextTurn function messed up')
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
    nextTurn();
 }

function bidPickUp() {
  trump = pickUp.suit;
  switch(dealer) {
    case 1:
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


function clickHandCards(playerHandToClick){
  $('#player'+playerHandToClick.playerOrder+'HandCard1').click(function(){
        while ($('#player'+playerHandToClick.playerOrder+'PlayedCard').has('img').length == 0) {
        if (allowedToPlayCard(playerHandToClick, 0) == true) {
            console.log('True');
            playerHandToClick.hand[0].played = true;
            $('#player'+playerHandToClick.playerOrder+'HandCard1').appendTo('#player'+playerHandToClick.playerOrder+'PlayedCard');
            if (playerHandToClick.playerOrder == handStarter) {
              firstDealtSuit = playerHandToClick.hand[0].suit;
              currentWinningTrick = playerHandToClick.hand[0];
            } else {
              newChallenger = playerHandToClick.hand[0];
            }
            checkHandWinner();
        } else {
            console.log('False');
        } break;
  }});
  $('#player'+playerHandToClick.playerOrder+'HandCard2').click(function(){
        while ($('#player'+playerHandToClick.playerOrder+'PlayedCard').has('img').length == 0) {
        if (allowedToPlayCard(playerHandToClick, 1) == true) {
            console.log('True');
            playerHandToClick.hand[1].played = true;
            $('#player'+playerHandToClick.playerOrder+'HandCard2').appendTo('#player'+playerHandToClick.playerOrder+'PlayedCard');
            if (playerHandToClick.playerOrder == handStarter) {
              firstDealtSuit = playerHandToClick.hand[1].suit;
              currentWinningTrick = playerHandToClick.hand[1];
            } else {
              newChallenger = playerHandToClick.hand[1];
            }
            checkHandWinner();
        } else {
            console.log('False');
        } break;
  }});
  $('#player'+playerHandToClick.playerOrder+'HandCard3').click(function(){
        while ($('#player'+playerHandToClick.playerOrder+'PlayedCard').has('img').length == 0) {
        if (allowedToPlayCard(playerHandToClick, 2) == true) {
            console.log('True');
            playerHandToClick.hand[2].played = true;
            $('#player'+playerHandToClick.playerOrder+'HandCard3').appendTo('#player'+playerHandToClick.playerOrder+'PlayedCard');
            if (playerHandToClick.playerOrder == handStarter) {
              firstDealtSuit = playerHandToClick.hand[2].suit;
              currentWinningTrick = playerHandToClick.hand[2];
            } else {
              newChallenger = playerHandToClick.hand[2];
            }
            checkHandWinner();
        } else {
            console.log('False');
        } break;
  }});
  $('#player'+playerHandToClick.playerOrder+'HandCard4').click(function(){
        while ($('#player'+playerHandToClick.playerOrder+'PlayedCard').has('img').length == 0) {
        if (allowedToPlayCard(playerHandToClick, 3) == true) {
            console.log('True');
            playerHandToClick.hand[3].played = true;
            $('#player'+playerHandToClick.playerOrder+'HandCard4').appendTo('#player'+playerHandToClick.playerOrder+'PlayedCard');
            if (playerHandToClick.playerOrder == handStarter) {
              firstDealtSuit = playerHandToClick.hand[3].suit;
              currentWinningTrick = playerHandToClick.hand[3];
            } else {
              newChallenger = playerHandToClick.hand[3];
            }
            checkHandWinner();
        } else {
            console.log('False');
        } break;
  }});
  $('#player'+playerHandToClick.playerOrder+'HandCard5').click(function(){
        while ($('#player'+playerHandToClick.playerOrder+'PlayedCard').has('img').length == 0) {
        if (allowedToPlayCard(playerHandToClick, 4) == true) {
            console.log('True');
            playerHandToClick.hand[4].played = true;
            $('#player'+playerHandToClick.playerOrder+'HandCard5').appendTo('#player'+playerHandToClick.playerOrder+'PlayedCard');
            if (playerHandToClick.playerOrder == handStarter) {
              firstDealtSuit = playerHandToClick.hand[4].suit;
              currentWinningTrick = playerHandToClick.hand[4];
            } else {
              newChallenger = playerHandToClick.hand[4];
            }
            checkHandWinner();
        } else {
            console.log('False');
        } break;
  }});
 }


function allowedToPlayCard(canPlaceThisCard, whichCard){
    if (canPlaceThisCard.playerOrder == handStarter) {
      return true;
    } else if (canPlaceThisCard.hand[whichCard].suit == firstDealtSuit) {
      return true;
    } else if (haveDealtSuitInHand(canPlaceThisCard) == false) {
      return true;
    } else {
      return false;
    }
}

function haveDealtSuitInHand(handToCheck) {
    for (var i = 0; i < 5; i++) {
      if (handToCheck.hand[i].suit == firstDealtSuit && handToCheck.hand[i].played == false) {
        return true;
      }
    } return false;
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
  currentMove = currentWinningTrick.cardOwner;
}

function playFirstCard(dealer) {
  currentHand = hand+''
  // while(clickHandCards() = false){
    clickHandCards(dealer);
  currentWinningTrick =
  firstDealtSuit = currentWinningTrick.suit;
}

function playCard() {
  checkHandWinner();
}

function checkHandWinner() {
  if (currentWinningTrick.trump == true && newChallenger.trump == false) {
    currentWinningTrick = currentWinningTrick;
  } else if (currentWinningTrick.trump == false && newChallenger.trump == true) {
    currentWinningTrick = newChallenger;
  } else if (currentWinningTrick.trump == true && currentWinningTrick.trump == true) {
    checkHigherCard();
  } else {
    checkDealtSuit();
  }
}

function checkDealtSuit() {
  if (newChallenger.suit != firstDealtSuit){
    currentWinningTrick = currentWinningTrick;
  } else {
    checkHigherCard();
  }
}

function checkHigherCard() {
  if (currentWinningTrick.rankNum > newChallenger.rankNum) {
    currentWinningTrick = currentWinningTrick;
  } else {
    currentWinningTrick = newChallenger;
  }
}

function trickScore(finalTrickWinner) {
  if (finalTrickWinner.cardOwner == 1 || finalTrickWinner.cardOwner == 3) {
    var teamOneHandScore = teamOneHandScore + 1;
  } else if (finalTrickWinner.cardOwner == 2 || finalTrickWinner.cardOwner == 4) {
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
