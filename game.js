var game = function(playerList) {
	this.playerList = playerList
	dealerCounter = 0
	var turn1 = new turn(this.playerList)
	// turn1.postBlinds()
	turn1.dealHoleCards()	
	turn1.dealFlop()
	turn1.dealTurn()
	turn1.dealRiver()
}

var turn = function(playerList) {
	this.deck = _.shuffle(deck)
	this.deckCount = 0
	this.pot = 0
	this.playerList = playerList
}

// 

turn.prototype.dealHoleCards = function() {
	var playerList = this.playerList
	for (player in playerList) {
		this.deck.slice(this.deckCount,this.deckCount+2).forEach(function(card) {
			playerList[player].addCard(card)
		})
	dealHoleCardsViews(playerList[player])
		this.deckCount += 2
	}
	this.updatedInformationViews(playerList)
}


turn.prototype.dealFlop = function () {
	var playerList = this.playerList
	this.deck.slice(this.deckCount,this.deckCount+3).forEach(function(card){
		for (player in playerList) {
			playerList[player].addCard(card)
		}
	}) 
	dealFlopViews(playerList)
	this.deckCount += 3
	this.updatedInformationViews(playerList)
}

turn.prototype.dealTurn = function () {
	var playerList = this.playerList
	this.deck.slice(this.deckCount,this.deckCount+1).forEach(function(card){
		for (player in playerList) {
			playerList[player].addCard(card)
		}
	}) 
	dealTurnViews(playerList)
	this.deckCount += 1
	this.updatedInformationViews(playerList)
}

turn.prototype.dealRiver = function () {
	var playerList = this.playerList
	this.deck.slice(this.deckCount,this.deckCount+1).forEach(function(card){
		for (player in playerList) {
			playerList[player].addCard(card)
		}
	}) 
	dealRiverViews(playerList)
	this.deckCount += 1
	this.updatedInformationViews(playerList)
}


function dealHoleCardsViews (player) {
	/// displays cards
	ID = player.playerID
	card1 = player.hand['Cards'][0].ID
	card2 = player.hand['Cards'][1].ID
	$('#player'+ID).find(".holecard1").html("<img src = 'cards/"+card1+".png'>")
	$('#player'+ID).find(".holecard2").html("<img src = 'cards/"+card2+".png'>")
}


function dealFlopViews (playerList) {
	card3 = playerList[0].hand['Cards'][2].ID
	card4 = playerList[0].hand['Cards'][3].ID
	card5 = playerList[0].hand['Cards'][4].ID
	$(".boardcard3").html("<img src = 'cards/"+card3+".png'>")
	$(".boardcard4").html("<img src = 'cards/"+card4+".png'>")
	$(".boardcard5").html("<img src = 'cards/"+card5+".png'>")
}

function dealTurnViews (playerList) {
	card6 = playerList[0].hand['Cards'][5].ID
	$(".boardcard6").html("<img src = 'cards/"+card6+".png'>")
}

function dealRiverViews (playerList) {
	card7 = playerList[0].hand['Cards'][6].ID
	$(".boardcard7").html("<img src = 'cards/"+card7+".png'>")
}

turn.prototype.updatedInformationViews = function() {
	for (player in this.playerList) {
		ID = this.playerList[player].playerID
		$('#player'+ID).find(".stack").text("Current Stack: " + this.playerList[player].chips)
		$('#player'+ID).find(".bet").text("Bet amount: " + this.playerList[player].currentBet)
	}
	$(".pot").text("Current pot amount: " + this.pot)
}

// $('#player'+ID).find(".stack").text("Current Stack: " + player.chips)

$(document).ready(function(){
	var newGame = new game(currentPlayerList)
})


// console.log(player1.hand)
// console.log(player2.hand)

