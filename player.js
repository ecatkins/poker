 
var blankHand = function(){
    
    this.hand = {
        "Cards":[],
        "Types":{
            "Ace": [],
            "King": [],
            "Queen": [],
            "Jack": [],
            "10": [],
            "9": [],
            "8": [],
            "7": [],
            "6": [],
            "5": [],
            "4": [],
            "3": [],
            "2": [],
        },
        "Suits": {
            "Hearts": [],
            "Spades": [],
            "Clubs": [],
            "Diamonds": []
        }
    }
}


var player = function(name,id){
    this.playerName = name
    this.playerID = id
    this.hand = new blankHand().hand
    ///harcoded chips
    this.chips = 1500
}


player.prototype.addCard = function(card) {
    var type = card.Type
    this.hand.Cards.push(card);
    this.hand.Types[card.Type].push(card)
    this.hand.Suits[card.Suit].push(card)
}

player.prototype.clearHand = function() {
    this.hand = new blankHand().hand
}



player.prototype.handScore = function() {
    var playerHand = this.hand
    allHands = []
    var handTypes = [straightFlush, fourOfAKind,fullHouse, flush, straight, threeOfAKind, twoPair, pair, highCard]
    function assessHands(func,index,array) {
      hands = []
      if (func(playerHand)) {
        allHands.push([func(playerHand),index])
      }
    }
    handTypes.forEach(assessHands)
    return allHands[0]
}


var numPlayers = 2
///hardcoded for the moment
var player1 = new player("Eddy",1)
var player2 = new player("Adam",2)
// var player3 = new player("Computer")

var playerList = [player1, player2]





// var card1 = { Suit: 'Hearts', Type: 'Jack', Value: 11}
// var card2 = { Suit: 'Clubs', Type: '10', Value: 10}
// var card3 = { Suit: 'Clubs', Type: '7', Value: 7}
// var card4 = { Suit: 'Clubs', Type: 'Queen', Value: 12}
// var card5 = { Suit: 'Hearts', Type: '4', Value: 4}
// var card6 = { Suit: 'Clubs', Type: '9', Value: 9}
// var card7 = { Suit: 'Clubs', Type: 'Ace', Value: 13}


// player1.addCard(card1)
// player1.addCard(card2)
// player1.addCard(card3)
// player1.addCard(card4)
// player1.addCard(card5)
// player1.addCard(card6)
// player1.addCard(card7)

// console.log(player1.hand)

// console.log(player1.handScore())


