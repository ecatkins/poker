var


var hand = ["3h","5h","2h","3h","6h"]

// hands = [
// 	straight_flush(hand),
// 	]


function flush(hand) {
	var type = hand[0][1]
	console.log(type)
	for (var card in hand) {
		if (hand[card][1] !== type) {
			console.log(hand[card][1])
			return false
		}
	}
	return true
}

console.log(flush(hand))


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
  { Suit: 'Spades', Type: 'Ace' , Value: 14}' ]