 
var blankHand = function(){
    
    this.hand = {
        "Cards":[],
        "Types":{
            "A": [],
            "K": [],
            "Q": [],
            "J": [],
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


var player = function(){

    this.hand = new blankHand().hand
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

var player1 = new player()



var card1 = { Suit: 'Hearts', Type: '2', Value: 2}
var card2 = { Suit: 'Diamonds', Type: '2', Value: 2}
var card3 = { Suit: 'Clubs', Type: '4', Value: 4}
var card4 = { Suit: 'Spades', Type: '2', Value: 2}
var card5 = { Suit: 'Clubs', Type: '6', Value: 6}
var card6 = { Suit: 'Hearts', Type: '5', Value: 5}
var card7 = { Suit: 'Clubs', Type: '7', Value: 7}


player1.addCard(card1)
player1.addCard(card2)
player1.addCard(card3)
player1.addCard(card4)
player1.addCard(card5)
player1.addCard(card6)
player1.addCard(card7)

console.log(player1.hand)



// player1.clearHand()
// console.log(player1.hand)
