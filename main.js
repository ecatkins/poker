function compare(cardA, cardB) {
  if (cardA.Value < cardB.Value){
    return -1;
  }
  if (cardA.Value > cardB.Value){
    return 1;
  }
  return 0
}



function flush(hand) {
  for (var key in hand.Suits){
    if (hand.Suits[key].length >=5){
      var flushSuit = hand.Suits[key]
      flushSuit.sort(compare).reverse()
      bestFlush = flushSuit.slice(0,5)
      return [flush, flush_score(bestFlush)]
    }
  }
  return false
}

function flush_score(hand) {
  score = 0
  valueList =[]
  for (var card in hand) {
    valueList.push(hand[card].Value)
  }
  valueList.sort().reverse()
  for (var val in valueList) {
    score += Math.pow(valueList[val],(5-val))
  }
  return score
}


// console.log(flush(player1.hand))

function fourOfAKind(hand) {
  var highCard = { Value: 2}
  var bestFour = false
  for (var key in hand.Types){
    if (hand.Types[key].length === 4) {
      bestFour = hand.Types[key]
    }
    else if (hand.Types[key].length === 1) {
      if (hand.Types[key][0].Value > highCard.Value){
        highCard = hand.Types[key][0]
      }
    }
  }
  if (bestFour){
    bestFour.push(highCard)
    return [bestFour, fourOfAKind_score(bestFour)]
  }
  else {
    return false
  }
}

function fourOfAKind_score(hand) {
  return hand[0].Value * 100 + hand[4].Value
}

// console.log(fourOfAKind(player1.hand))

/// can refactor to make more simple
function threeOfAKind(hand) {
  var high = {Value: 0}
  var low = {Value: 0}
  var bestThree = [{Value: 0}]
  for (var key in hand.Types){
    if (hand.Types[key].length === 3) {
      if (hand.Types[key][0].Value > bestThree[0].Value) {
        bestThree = hand.Types[key]        
      }
    }
    if (hand.Types[key].length === 1) {
      if (hand.Types[key][0].Value > high.Value) {
        low = high
        high = hand.Types[key][0]
      }
      else if (hand.Types[key][0].Value > low.Value) {
        low = hand.Types[key][0]
      }
    } 
  }
  if (bestThree[0].Value != 0) {
    bestThree.push(high)
    bestThree.push(low)
    return [bestThree, threeOfAKind_score(bestThree)]
  }
  return false   
}

// console.log(threeOfAKind(player1.hand))


function threeOfAKind_score(hand) {
  return hand[0].Value * 400 + hand[3].Value * 20 + hand[4].Value
}


/// Note to Adam: Don't have to test for "best pair" because if if there were multiple pairs
/// This would be caught by the two pair function? (Same for above)
function pair(hand) {
  var pair = false
  var otherCards = []
  for (var key in hand.Types){
    if (hand.Types[key].length === 2) {
        pair = hand.Types[key]
        }
    else if (hand.Types[key].length === 1) {
      otherCards.push(hand.Types[key][0])
      }
    }
  if (pair) {
    otherCards.sort(compare).reverse()
    var bestPair = pair.concat(otherCards.slice(0,3))
    return [bestPair, pair_score(bestPair)]
  }
  return false
}          


function pair_score(hand) {
  return 8000 * hand[0].Value + 400 * hand[2].Value  +  20 * hand[3].Value  + hand[4].Value
}


function straight(hand) {
  listTypes = []
  straight = false
   for (var key in hand.Types){
    if (hand.Types[key].length > 0) {
      listTypes.push(hand.Types[key][0])
    }
  }
    listTypes.sort(compare).reverse()
    for (var i=0; i < listTypes.length-3;i++) {
      if (listTypes[i].Value === listTypes[i+1].Value + 1 
        && listTypes[i].Value === listTypes[i+2].Value + 2
        && listTypes[i].Value === listTypes[i+3].Value + 3
        && listTypes[i].Value === listTypes[i+4].Value + 4)
       {
        straight = listTypes.slice(i,i+5)
        break
      }
    }
    if (straight) {
      return [straight, straight_score(straight)]
    }
   return false 
  }

function straight_score(hand) {
  return hand[0].Value
}

// console.log(straight(player1.hand))


function straightFlush(hand) {
  straightFlush = false
  for (var key in hand.Suits){
    if (hand.Suits[key].length >=5){
      var flushSuit = hand.Suits[key]
      flushSuit.sort(compare).reverse()
      for (var i = 0; i < flushSuit.length-3;i++) {
        if (flushSuit[i].Value === flushSuit[i+1].Value + 1 
        && flushSuit[i].Value === flushSuit[i+2].Value + 2
        && flushSuit[i].Value === flushSuit[i+3].Value + 3
        && flushSuit[i].Value === flushSuit[i+4].Value + 4)
       {
        straightFlush = flushSuit.slice(i,i+5)
        break
      }
      }
      if (straightFlush) {
        return [straightFlush,straightFlush_score(straightFlush)]
      }
    }
  }
  return false
}

function straightFlush_score(hand) {
  return hand[0].Value
}

// console.log(straightFlush(player1.hand))   

function fullHouse(hand) {
  if(threeOfAKind(hand) && pair(hand)) {
    for (var key in hand.Types){
    if (hand.Types[key].length === 2) {
      if (hand.Types[key][0].Value > bestThree[0].Value) {
        bestThree = hand.Types[key]        
      }
    }

    return [threeOfAKind(hand).splice(0,3),pair(hand).splice(0,2)]
  }
}
