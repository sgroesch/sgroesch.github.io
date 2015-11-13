window.onload = function() {
playGame();

}

// Setting variables to initial values
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
var teamOneHandScore = 0;
var teamTwoHandScore = 0;
var teamOneTotalScore = 0;
var teamTwoTotalScore = 0;
var makerTeamOne = false;
var makerTeamTwo = false;
var trump;
var oppositeTrump;
var currentMove = {
  playerOrder: null,
  hand: [null, null, null, null, null],
  goAlone: null,
  dummy: null,
  controller: null};
var dealer = 4;
var firstDealtSuit;
var currentWinningTrick;
var newChallenger = {trump: false};
var handStarter;
var counter = 0;
var bidStarter;
var pass = 0;

// Main game function
function playGame() {
  makeDeck();
  deal();
  nextDealer();
  reRender();
  changer(dealer);
  setCurrentMove();
  bidding();
}

// Makes the deck
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

// Shuffles the deck
function shuffle() {
  for (var i = 0; i < deckOfCards.length; i++) {
      deckOfCards[i].ranNum = Math.random();
    }
  deckOfCards.sort(function(a, b) {
      return a.ranNum - b.ranNum;
    });
}

// Shuffles and then deals deck and adds cardOwner attribute
function deal() {
      shuffle();
      for (var i = 0; i < 5; i++) {
        deckOfCards[i].cardOwner = 1;
        deckOfCards[i+5].cardOwner = 2;
        deckOfCards[i+10].cardOwner = 3;
        deckOfCards[i+15].cardOwner = 4;
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


// Functions to show background of cards at deal
function imgUrl (card) {
  return 'styles/cards/' + card.rank + '_of_' + card.suit + '.png';
}

function renderPickUp(render) {
  $('#middleCard').append('<img class="card" src='+imgUrl(render)+'></img>')
}

function renderHands(whichPlayersHand, inc) {
  $('#player'+whichPlayersHand.playerOrder+'GameArea').append('<img class="card" id="player'+whichPlayersHand.playerOrder+'HandCard'+(inc + 1)+'" src='+imgUrl(whichPlayersHand.hand[inc])+'></img>');
}

// Set dealer to next value
function nextDealer() {
  dealer = (dealer%4 + 1);
}

// Sets first move and other variables to person after dealer
function setCurrentMove() {
  switch (dealer) {
    case 1: currentMove = player2;
      break;
    case 2: currentMove = player3;
      break;
    case 3: currentMove = player4;
      break;
    case 4: currentMove = player1;
      break;
    default: console.log('setCurrentMove function messed up');
  }
  handStarter = (dealer%4 + 1);
  bidStarter = (dealer%4 + 1);
  pass = 0;
}

// Theoretically adds going alone and dummys to the game. Next feature to implement
// function setGoingAloneAndDummy(currentMove) {
//   switch (currentMove.playerOrder) {
//     case 1: player1.goAlone = true;
//             player3.dummy = true;
//       break;
//     case 2: player2.goAlone = true;
//             player4.dummy = true;
//       break;
//     case 3: player3.goAlone = true;
//             player1.dummy = true;
//       break;
//     case 4: player4.goAlone = true;
//             player2.dummy = true;
//       break;
//     default: console.log('Setting the goAlone function messed up');
//   }
// }

// The first function for bidding. Also eventually starts the hand
function bidding(){
  reRender();
  changer(bidStarter);
  if (pass > 7) {
    renderTotalScore();
  } else if (pass > 3) {
    $('#messageBar').append('Player '+bidStarter+'\'s turn to pass or choose the trump: <button class="bidButton" id="bidPassButton">Pass</button><button class="bidButton" id="btnSpades">Spades</button><button class="bidButton" id="btnHearts">Hearts</button><button class="bidButton" id="btnDiamonds">Diamonds</button><button class="bidButton" id="btnClubs">Clubs</button>');
    $('#middleCard').empty();
    $('#bidPassButton').on('click', function(){bidPass()});
    $('#btnSpades').on('click', function(){setTrumpFromButton('spades')});
    $('#btnHearts').on('click', function(){setTrumpFromButton('hearts')});
    $('#btnDiamonds').on('click', function(){setTrumpFromButton('diamonds')});
    $('#btnClubs').on('click', function(){setTrumpFromButton('clubs')});
  } else {
    $('#messageBar').append('Player '+bidStarter+'\'s turn to pass or make the dealer pick it up: <button class="bidButton" id="bidPassButton">Pass</button>  <button class="bidButton" id="bidPickUpButton">Pick it Up!</button>');
    $('#bidPassButton').on('click', function(){bidPass()});
    $('#bidPickUpButton').on('click', function(){bidPickUp()});
  }
}

// Function to run if player passes
function bidPass(){
    bidStarter = (bidStarter%4 + 1);
    pass = pass + 1;
    $('#messageBar').empty();
    bidding();
}

// Function to run if player picks up. Runs the trumpCardToHand function at end
function bidPickUp() {
  $('#messageBar').empty();
  trump = pickUp.suit;
  setMaker();
  setTrump();
  reRender();
  changer(dealer);
  trumpCardToHand();
}

// Function to set trump to a user input after 4 passes
function setTrumpFromButton(givenTrump) {
      trump = givenTrump;
      $('#messageBar').empty();
      setMaker();
      setTrump();
      reRender();
      changer(handStarter);
      clickHandCards();
}

//Two functions for switching middle card to hand and starting the first trick
function trumpCardToHand() {
  $('#messageBar').append('Player '+dealer+', choose a card to discard')
  $('#player'+dealer+'HandCard1').click(function(){whichCardToSwitch(1)});
  $('#player'+dealer+'HandCard2').click(function(){whichCardToSwitch(2)});
  $('#player'+dealer+'HandCard3').click(function(){whichCardToSwitch(3)});
  $('#player'+dealer+'HandCard4').click(function(){whichCardToSwitch(4)});
  $('#player'+dealer+'HandCard5').click(function(){whichCardToSwitch(5)});
}

function whichCardToSwitch(handNumber) {
  $('#player'+dealer+'HandCard'+handNumber).attr('src', imgUrl(deckOfCards[23]));
  $('#middleCard').empty();
  $('#messageBar').empty();
  $('.card').unbind('click');
  switch (dealer) {
    case 1: player1.hand[(handNumber-1)] = deckOfCards[23];
            player1.hand[(handNumber-1)].cardOwner = 1;
      break;
    case 2: player2.hand[(handNumber-1)] = deckOfCards[23];
            player2.hand[(handNumber-1)].cardOwner = 2;
      break;
    case 3: player3.hand[(handNumber-1)] = deckOfCards[23];
            player3.hand[(handNumber-1)].cardOwner = 3;
      break;
    case 4: player4.hand[(handNumber-1)] = deckOfCards[23];
            player4.hand[(handNumber-1)].cardOwner = 4;
      break;
    default: console.log('whichCardToSwitch function messed up');
  }
  reRender();
  changer((dealer+1));
  clickHandCards();
}

// Sets the maker when trump is declared
function setMaker() {
  if (bidStarter == 1 || bidStarter == 3){
    makerTeamOne = true;
    makerTeamTwo = false;
  } else if (bidStarter == 2 || bidStarter == 4){
    makerTeamOne = false;
    makerTeamTwo = true;
  }
}

// Sets trump attribute on all the cards when it is declared
function setTrump() {
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
  $('#currentTrump').append(''+trump.toUpperCase());
  for (var i = 0; i < 24; i++) {
    if (deckOfCards[i].suit == trump && deckOfCards[i].rank == 'jack') {
      deckOfCards[i].trump = true;
      deckOfCards[i].rankNum = 8;
    } else if (deckOfCards[i].suit == trump) {
      deckOfCards[i].trump = true;
    } else if (deckOfCards[i].suit == oppositeTrump && deckOfCards[i].rank == 'jack') {
      deckOfCards[i].trump = true;
      deckOfCards[i].rankNum = 7;
      deckOfCards[i].suit = trump;
    } else {
      deckOfCards[i].trump = false;
    }
  }
}

// Playing the hand

// Two functions to click the desired card to play
function clickHandCards(){
  $('#messageBar').append('Player '+currentMove.playerOrder+', choose a card');
  $('#player'+currentMove.playerOrder+'HandCard1').click(function(){
        dry(1)});
  $('#player'+currentMove.playerOrder+'HandCard2').click(function(){
        dry(2)});
  $('#player'+currentMove.playerOrder+'HandCard3').click(function(){
        dry(3)});
  $('#player'+currentMove.playerOrder+'HandCard4').click(function(){
        dry(4)});
  $('#player'+currentMove.playerOrder+'HandCard5').click(function(){
        dry(5)});
 }

function dry(cardNum){
  $('#messageBar').empty();
  while ($('#player'+currentMove.playerOrder+'PlayedCard').has('img').length == 0) {
  if (allowedToPlayCard(currentMove, (cardNum - 1)) == true) {
      console.log('True');
      currentMove.hand[(cardNum - 1)].played = true;
      $('#player'+currentMove.playerOrder+'HandCard'+cardNum).hide().appendTo('#player'+currentMove.playerOrder+'PlayedCard').fadeIn();
      if (currentMove.playerOrder == handStarter) {
        firstDealtSuit = currentMove.hand[(cardNum - 1)].suit;
        currentWinningTrick = currentMove.hand[(cardNum - 1)];
      } else {
        newChallenger = currentMove.hand[(cardNum - 1)];
      }
      checkHandWinner();
      nextTurn();
  } else {
      console.log('False');
  }
  break;
  }
}

// Checks if the chosen card is able to be played within the rules
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

// Checks if the player's hand has a specific suit in it
function haveDealtSuitInHand(handToCheck) {
    for (var i = 0; i < 5; i++) {
      if (handToCheck.hand[i].suit == firstDealtSuit && handToCheck.hand[i].played == false) {
        return true;
      }
    } return false;
}

// Next three functions compare two cards at a time and set the winner for the next card to be played
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

// Moves the currentMove variable to the next player and plays another hand or renders the trick score (Effectively ending the hand)
function nextTurn() {
  switch (currentMove.playerOrder) {
    case 1: if (player2.dummy == true) {
              currentMove = player3;
            } else {
              currentMove = player2;
              reRender()
              changer(2)
            };
        break;
    case 2: if (player3.dummy == true) {
              currentMove = player4;
            } else {
              currentMove = player3;
              reRender()
              changer(3)
            };
        break;
    case 3: if (player4.dummy == true) {
              currentMove = player1;
            } else {
              currentMove = player4;
              reRender()
              changer(4)
            };
        break;
    case 4: if (player1.dummy == true) {
              currentMove = player2;
            } else {
              currentMove = player1;
              reRender()
              changer(1)
            };
        break;
    default: console.log('The nextTurn function messed up')
  }
  $('.card').unbind('click');
  counter = counter + 1;
  if (counter < 4) {
    clickHandCards();
  } else if (counter == 4) {
    trickScore();
    renderHandScore();
  }
}

// Sets the starter for the next trick based on who won the last one
function setHandStarter() {
  handStarter = currentWinningTrick.cardOwner;
  firstDealtSuit = '';
  switch (handStarter) {
    case 1: currentMove = player1;
      break;
    case 2: currentMove = player2;
        break;
    case 3: currentMove = player3;
        break;
    case 4: currentMove = player4;
        break;
    default: console.log('Did not reset hand starter');
  }
}

// Next two functions set every non played card that isn't in the current player's hand to the background image of the back of the card
function change(imgToFlip) {
      $(imgToFlip).attr('src','styles/cards/back.png')
}

function changer(openHand) {
  switch (openHand) {
    case 1: for (var i = 1; i < 6; i++) {
      if (player2.hand[i-1].played ==false){
        change('#player2HandCard'+i)}
      if (player3.hand[i-1].played ==false){
        change('#player3HandCard'+i)}
      if (player4.hand[i-1].played ==false){
        change('#player4HandCard'+i)}
    } break;
    case 2: for (var i = 1; i < 6; i++) {
      if (player1.hand[i-1].played ==false){
        change('#player1HandCard'+i)}
      if (player3.hand[i-1].played ==false){
        change('#player3HandCard'+i)}
      if (player4.hand[i-1].played ==false){
        change('#player4HandCard'+i)}
    } break;
    case 3: for (var i = 1; i < 6; i++) {
      if (player1.hand[i-1].played ==false){
        change('#player1HandCard'+i)}
      if (player2.hand[i-1].played ==false){
        change('#player2HandCard'+i)}
      if (player4.hand[i-1].played ==false){
        change('#player4HandCard'+i)}
    } break;
    case 4: for (var i = 1; i <6; i++) {
      if (player2.hand[i-1].played ==false){
        change('#player2HandCard'+i)}
      if (player3.hand[i-1].played ==false){
        change('#player3HandCard'+i)}
      if (player1.hand[i-1].played ==false){
        change('#player1HandCard'+i)}
    } break;
    default: console.log('Changer function messed up')
  }
}

// Rerenders every card on the board again. Used in conjunction with the changer function
function reRender() {
    for (var i = 0; i < 5; i++) {
        $('#player1HandCard'+(i+1)).attr('src','styles/cards/'+player1.hand[i].rank+'_of_'+player1.hand[i].suit+'.png')
        $('#player2HandCard'+(i+1)).attr('src','styles/cards/'+player2.hand[i].rank+'_of_'+player2.hand[i].suit+'.png')
        $('#player3HandCard'+(i+1)).attr('src','styles/cards/'+player3.hand[i].rank+'_of_'+player3.hand[i].suit+'.png')
        $('#player4HandCard'+(i+1)).attr('src','styles/cards/'+player4.hand[i].rank+'_of_'+player4.hand[i].suit+'.png')
    }
}

// Keep Score and Declare winner

// Counts the number of tricks each team has won
function trickScore() {
  if (currentWinningTrick.cardOwner == 1 || currentWinningTrick.cardOwner == 3) {
    teamOneHandScore = teamOneHandScore + 1;
  } else if (currentWinningTrick.cardOwner == 2 || currentWinningTrick.cardOwner == 4) {
    teamTwoHandScore = teamTwoHandScore + 1;
  }
}

// Renders the hand score after each trick. Once five tricks are played it runs renderTotalScore
function renderHandScore() {
  $('#scoreHandTeamOne').empty()
  $('#scoreHandTeamTwo').empty()
  $('#scoreHandTeamOne').append(' '+teamOneHandScore+' ');
  $('#scoreHandTeamTwo').append(' '+teamTwoHandScore+' ');
  for (var i = 1; i < 5; i++) {
    $('#player'+i+'PlayedCard').empty();
  }
  setHandStarter();
  counter = 0;
  reRender();
  changer(handStarter);
  console.log(handStarter);
  console.log(currentMove);
  currentWinningTrick = {};
  newChallenger = {};
  if ((teamOneHandScore + teamTwoHandScore) == 5) {
    $('#currentTrump').empty();
    renderTotalScore();
  } else {
    clickHandCards();
  }
}

// Adds up total score based on the maker, going alone and amount of tricks won, then renders the total score, resets hand and checks to see if the game is over
function renderTotalScore() {
  if (makerTeamOne == true) {
    if (player1.goAlone == true || player3.goAlone == true) {
      if (teamOneHandScore == 5) {
        teamOneTotalScore = teamOneTotalScore + 4;
      } else if (teamOneHandScore > 2) {
        teamOneTotalScore = teamOneTotalScore + 1;
      } else if (player2.goAlone == true || player4.goAlone == true) {
        teamTwoTotalScore = teamTwoTotalScore + 4;
      } else {
        teamTwoTotalScore = teamTwoTotalScore + 2;
      }
    } else {
        if (teamOneHandScore == 5) {
          teamOneTotalScore = teamOneTotalScore + 2;
        } else if (teamOneHandScore > 2){
          teamOneTotalScore = teamOneTotalScore + 1;
        } else {
          teamTwoTotalScore = teamTwoTotalScore + 2;
        }
    }
  } else if (makerTeamTwo == true) {
    if (player2.goAlone == true || player4.goAlone == true) {
      if (teamTwoHandScore == 5) {
        teamTwoTotalScore = teamTwoTotalScore + 4;
      } else if (teamTwoHandScore > 2) {
        teamTwoTotalScore = teamTwoTotalScore + 1;
      } else if (player1.goAlone == true || player3.goAlone == true){
        teamOneTotalScore = teamOneTotalScore + 4;
      } else {
        teamOneTotalScore = teamOneTotalScore + 2;
      }
    } else {
        if (teamTwoHandScore == 5) {
          teamTwoTotalScore = teamTwoTotalScore + 2;
        } else if (teamTwoHandScore > 2){
          teamTwoTotalScore = teamTwoTotalScore + 1;
        } else {
          teamOneTotalScore = teamOneTotalScore + 2;
        }
      }
  } else {
    console.log('There was an error adding the Total Score')
    }
    $('#messageBar').empty();
    $('#scoreHandTeamOne').empty();
    $('#scoreHandTeamTwo').empty();
    $('#scoreTeamOne').empty();
    $('#scoreTeamTwo').empty();
    $('#scoreTeamOne').append(' '+teamOneTotalScore+' ');
    $('#scoreTeamTwo').append(' '+teamTwoTotalScore+' ');
    resetHand();
    if ((teamOneTotalScore > 9 && (teamOneTotalScore - teamTwoTotalScore) > 1) || (teamTwoTotalScore > 9 && (teamTwoTotalScore - teamOneTotalScore) > 1) ) {
      gameOver();
    } else {
    playGame();
    }
}

// Resets the hands and variables used each hand. Runs in render total score function
function resetHand() {
  player1.hand = [];
  player2.hand = [];
  player3.hand = [];
  player4.hand = [];
  player1.goAlone = false;
  player2.goAlone = false;
  player3.goAlone = false;
  player4.goAlone = false;
  player1.dummy = false;
  player2.dummy = false;
  player3.dummy = false;
  player4.dummy = false;
  teamOneHandScore = 0;
  teamTwoHandScore = 0;
  $('img').detach();
}

// Determines a winner and outputs the result once renderTotalScore has determined that there is a winner
function gameOver() {
  if (teamOneTotalScore > teamTwoTotalScore) {
    $('#messageBar').append('Team One Wins!    <button id="playAgain">Play Again?</button>')
  } else if (teamTwoTotalScore > teamOneTotalScore) {
    $('#messageBar').append('Team Two Wins!    <button id="playAgain">Play Again?</button>')
  } else {
    console.log('There was an error with gameOver function')
  }
    $('#playAgain').click(function() {
        location.reload();
      });
}
