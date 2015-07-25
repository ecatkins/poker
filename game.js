var turn = function() {
	this.deck = _.shuffle(deck)
	this.deckCount = 0
	this.pot = 0
}

turn.prototype.dealHoleCards = function() {
	for (player in playerList) {
		this.deck.slice(this.deckCount,this.deckCount+2).forEach(function(card) {
			playerList[player].addCard(card)
		})
	dealHoleCardsViews(playerList[player])
		this.deckCount += 2
	}
}


function dealHoleCardsViews (player) {
	ID = player.playerID
	card1 = player.hand['Cards'][0].ID
	card2 = player.hand['Cards'][1].ID
	$('#player'+ID).find(".holecard1").html("<img src = 'cards/"+card1+".png'>")
	$('#player'+ID).find(".holecard2").html("<img src = 'cards/"+card2+".png'>")
}

$(document).ready(function(){
var turn1 = new turn()
turn1.dealHoleCards()
})


// console.log(player1.hand)
// console.log(player2.hand)

