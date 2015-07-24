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
      return flush_score(bestFlush)
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
    return fourOfAKind_score(bestFour)
  }
  else {
    return false
  }
}

// work on this
function fourOfAKind_score(hand) {
  return hand[0].Value * 100 + hand[4].Value
}

// console.log(fourOfAKind(player1.hand))


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
    console.log(bestThree)
    return threeOfAKind_score(bestThree)
  }
  return false   
}

console.log(threeOfAKind(player1.hand))


function threeOfAKind_score(hand) {
  return hand[0].Value * 100 + hand[3].Value * 20 + hand[4].Value
}



function pair(hand) {
  type_dict = {}
  for (var card in hand) {
    if ((hand[card].Value) in type_dict) {
      type_dict[hand[card].Value] += 1
    }
    else {
      type_dict[hand[card].Value] = 1
    }
  }
  for (key in type_dict) {
    if (type_dict[key] === 2) {
      return pair_score(type_dict)
    }
  } 
  return false
}

function pair_score(type_dict) {
  score = 0
  for (key in type_dict) {
    if (type_dict[key] === 2) {
      score += Math.pow(parseInt(key),3)*100
    }
    else {
      ///check
      score += Math.pow(parseInt(key),3)
    }
  }
  return score
}

function straight(hand) {
  valueList = []
  for (var card in hand) {
    valueList.push(hand[card].Value)
  }
  valueList.sort()
  for (var i=0; i < valueList.length-1;i++) {
    if (valueList[i] + 1 != valueList[i+1]) {
      return false
    }
  }
  /// Simple - does not require score function
  return valueList[0]
}

function straightFlush(hand) {
  if (flush(hand) && straight(hand)) {
    return straight(hand)
  }
  return false
}

function fullHouse(hand) {
  if(threeOfAKind(hand) && pair(hand)) {
    return
  }
}
