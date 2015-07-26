 
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
    this.currentBet = 0
    this.inHand = true
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


//// This loops through all players crads and returns its score (compares within hand type) and its index
/// i.e. straigh flush = index[0] fourofAkind = index[1] etc
player.prototype.handScore = function() {
    var playerHand = this.hand
    allHands = []
    var handTypes = [straightFlush, fourOfAKind,fullHouse, flush, straight, threeOfAKind, twoPair, pair, highCard]
    function assessHands(func,index,array) {
      if (func(playerHand)) {
        allHands.push([index, func(playerHand)[1], func(playerHand)[0]])
      }
    }
    handTypes.forEach(assessHands)
    return allHands[0]
}


var numPlayers = 2
///hardcoded for the moment
var player1 = new player("Eddy",1)
var player2 = new player("Adam",2)
var player3 = new player("Billy",3)
var player4 = new player("Greg",4)
// var player3 = new player("Computer")

var currentPlayerList = [player1, player2,player3,player4]





