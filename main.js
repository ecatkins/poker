
var hand = [{ Suit: 'Hearts', Type: '2', Value: 2},
  { Suit: 'Hearts', Type: '3', Value: 3},
  { Suit: 'Hearts', Type: '4', Value: 4},
  { Suit: 'Hearts', Type: '5', Value: 5},
  { Suit: 'Hearts', Type: '6', Value: 6}, { Suit: 'Hearts', Type: '5', Value: 5},
  { Suit: 'Clubs', Type: '6', Value: 6}]


var hand2 = [{ Suit: 'Hearts', Type: '2', Value: 2},
  { Suit: 'Spades', Type: '2', Value: 2},
  { Suit: 'Clubs', Type: '2', Value: 2},
  { Suit: 'Diamonds', Type: '2', Value: 2},
  { Suit: 'Hearts', Type: '6', Value: 6}]


var hand3 = [{ Suit: 'Hearts', Type: '2', Value: 1},
  { Suit: 'Spades', Type: '2', Value: 3},
  { Suit: 'Clubs', Type: '2', Value: 4},
  { Suit: 'Diamonds', Type: '2', Value: 4},
  { Suit: 'Hearts', Type: '6', Value: 4}]

var hand_pair = [{ Suit: 'Hearts', Type: '2', Value: 1},
  { Suit: 'Spades', Type: '2', Value: 3},
  { Suit: 'Clubs', Type: '2', Value: 13},
  { Suit: 'Diamonds', Type: '2', Value: 4},
  { Suit: 'Hearts', Type: '6', Value: 4}]

var hand_straight = [{ Suit: 'Hearts', Type: '2', Value: 4},
  { Suit: 'Spades', Type: '2', Value: 3},
  { Suit: 'Clubs', Type: '2', Value: 2},
  { Suit: 'Diamonds', Type: '2', Value: 5},
  { Suit: 'Hearts', Type: '6', Value: 6}]

var hand_straightFlush = [{ Suit: 'Hearts', Type: '2', Value: 4},
  { Suit: 'Hearts', Type: '2', Value: 3},
  { Suit: 'Hearts', Type: '2', Value: 2},
  { Suit: 'Hearts', Type: '2', Value: 5},
  { Suit: 'Hearts', Type: '6', Value: 6}]


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

function flush(hand) {
	var type = hand[0].Suit
	for (var card in hand) {
		if (hand[card].Suit != type) {
			return false
		}
	}
	return flush_score(hand)
}

function fourOfAKind(hand) {
  type_dict = {}
  for (var card in hand) {
    if ((hand[card].Type) in type_dict) {
      type_dict[hand[card].Value] += 1
    }
    else {
      type_dict[hand[card].Value] = 1
    }
  }
  for (key in type_dict) {
    if (type_dict[key] === 4) {
      return fourOfAKind_score(type_dict)
    }
  } 
  return false
}

function fourOfAKind_score(type_dict) {
  score = 0
  console.log(type_dict)
  for (key in type_dict) {
    console.log(key)
    if (type_dict[key] === 4) {
      score += parseInt(key)*100
    }
    else {
      score += parseInt(key)
    }
  }
  return score
}


function threeOfAKind(hand) {
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
    if (type_dict[key] === 3) {
      return threeOfAKind_score(type_dict)
    }
  } 
  return false
}


function threeOfAKind_score(type_dict) {
  score = 0
  for (key in type_dict) {
    if (type_dict[key] === 3) {
      score += Math.pow(parseInt(key),3)*100
    }
    else {
      ///check
      score += Math.pow(parseInt(key),2)
    }
  }
  return score
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
// console.log(flush(hand))
// console.log(flush_score(hand))
// console.log(fourOfAKind(hand2))
// console.log(fourOfAKind_score(hand2))
// console.log(threeOfAKind(hand))
// console.log(pair(hand_pair))
// console.log(straight(hand_straight))
console.log(straightFlush(hand_straightFlush))



var deck = [ { Suit: 'Clubs', Type: '2', Value: 2},
  { Suit: 'Clubs', Type: '3', Value: 3},
  { Suit: 'Clubs', Type: '4', Value: 4},
  { Suit: 'Clubs', Type: '5', Value: 5},
  { Suit: 'Clubs', Type: '6', Value: 6},
  { Suit: 'Clubs', Type: '7', Value: 7},
  { Suit: 'Clubs', Type: '8', Value: 8},
  { Suit: 'Clubs', Type: '9', Value: 9},
  { Suit: 'Clubs', Type: '10', Value: 10},
  { Suit: 'Clubs', Type: 'Jack', Value: 11},
  { Suit: 'Clubs', Type: 'Queen', Value: 12},
  { Suit: 'Clubs', Type: 'King', Value: 13},
  { Suit: 'Clubs', Type: 'Ace', Value: 14},
  { Suit: 'Diamonds', Type: '2', Value: 2},
  { Suit: 'Diamonds', Type: '3', Value: 3},
  { Suit: 'Diamonds', Type: '4', Value: 4},
  { Suit: 'Diamonds', Type: '5', Value: 5},
  { Suit: 'Diamonds', Type: '6', Value: 6},
  { Suit: 'Diamonds', Type: '7', Value: 7},
  { Suit: 'Diamonds', Type: '8', Value: 8},
  { Suit: 'Diamonds', Type: '9', Value: 9},
  { Suit: 'Diamonds', Type: '10', Value: 10},
  { Suit: 'Diamonds', Type: 'Jack', Value: 11},
  { Suit: 'Diamonds', Type: 'Queen', Value: 12},
  { Suit: 'Diamonds', Type: 'King', Value: 13},
  { Suit: 'Diamonds', Type: 'Ace', Value: 14},
  { Suit: 'Hearts', Type: '2', Value: 2},
  { Suit: 'Hearts', Type: '3', Value: 3},
  { Suit: 'Hearts', Type: '4', Value: 4},
  { Suit: 'Hearts', Type: '5', Value: 5},
  { Suit: 'Hearts', Type: '6', Value: 6},
  { Suit: 'Hearts', Type: '7', Value: 7},
  { Suit: 'Hearts', Type: '8', Value: 8},
  { Suit: 'Hearts', Type: '9', Value: 9},
  { Suit: 'Hearts', Type: '10', Value: 10},
  { Suit: 'Hearts', Type: 'Jack', Value: 11},
  { Suit: 'Hearts', Type: 'Queen', Value: 12},
  { Suit: 'Hearts', Type: 'King', Value: 13},
  { Suit: 'Hearts', Type: 'Ace', Value: 14},
  { Suit: 'Spades', Type: '2', Value: 2},
  { Suit: 'Spades', Type: '3', Value: 3},
  { Suit: 'Spades', Type: '4', Value: 4},
  { Suit: 'Spades', Type: '5', Value: 5},
  { Suit: 'Spades', Type: '6', Value: 6},
  { Suit: 'Spades', Type: '7', Value: 7},
  { Suit: 'Spades', Type: '8', Value: 8},
  { Suit: 'Spades', Type: '9', Value: 9},
  { Suit: 'Spades', Type: '10', Value: 10},
  { Suit: 'Spades', Type: 'Jack', Value: 11},
  { Suit: 'Spades', Type: 'Queen', Value: 12},
  { Suit: 'Spades', Type: 'King', Value: 13},
  { Suit: 'Spades', Type: 'Ace' , Value: 14} ]