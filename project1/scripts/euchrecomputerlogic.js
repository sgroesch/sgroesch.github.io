function handPoints(hand) {
 for (var i = 0; i < 5; i++) {
   if (hand[i].suit == 'Diamonds') {
     var diamondPoints = diamondPoints + countPoints(hand[i]);
     if (hand[i].rank = 'Jack'){
       var heartPoints = heartPoints + 6;
     }
   } else if (hand[i].suit == 'Hearts') {
     var heartPoints = heartPoints + countPoints(hand[i]);
     if (hand[i].rank = 'Jack'){
       var diamondPoints = diamondPoints + 6;
     }
   } else if (hand[i].suit == 'Clubs') {
     var clubPoints = clubPoints + countPoints(hand[i]);
     if (hand[i].rank = 'Jack'){
       var spadePoints = spadePoints + 6;
     }
   } else if (hand[i].suit == 'Spades') {
     var spadePoints = spadePoints + countPoints(hand[i]);
     if (hand[i].rank = 'Jack'){
       var clubPoints = clubPoints + 6;
     }
   } else {
     return error;
   }
   return [clubPoints, diamondPoints, heartPoints, spadePoints]
 }

  return pointsPerSuit
}

function countPoints (card) {
  var suitpoints;
  switch (card.suit) {
    case 'Nine': suitpoints = suitpoints + 1;
      break;
    case 'Ten': suitpoints = suitpoints + 2;
      break;
    case 'Jack': suitpoints = suitpoints + 7;
      break;
    case 'Queen': suitpoints = suitpoints + 3;
      break;
    case 'King': suitpoints = suitpoints + 4;
      break;
    case 'Ace': suitpoints = suitpoints + 5;
      break;
  }
  return suitpoints;
}
