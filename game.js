var game = function(playerList) {
	this.playerList = playerList
	this.dealerCounter = 0
	this.bigBlind = 30
	this.smallBlind = 15
	var turn1 = new turn(this.playerList,this.dealerCounter,this.smallBlind,this.bigBlind)
	turn1.postBlinds()
	// turn1.dealHoleCards()	
	// turn1.dealFlop()
	// turn1.dealTurn()
	// turn1.dealRiver()
}

var turn = function(playerList, dealerCounter, smallBlind, bigBlind) {
	this.deck = _.shuffle(deck)
	this.deckCount = 0
	this.pot = 0
	this.playerList = playerList
	this.dealerCounter = dealerCounter
	this.smallBlind = smallBlind
	this.bigBlind = bigBlind
	this.currentPlayerNumber = this.dealerCounter
	this.currentPlayer = this.playerList[this.currentPlayerNumber]
}

///this function makes the player list is circular
turn.prototype.changeCurrentPlayer = function() {
	var numPlayers = this.playerList.length
	if (this.currentPlayerNumber === numPlayers - 1) {
		this.currentPlayerNumber = 0
	}
	else {
		this.currentPlayerNumber += 1
	}
	this.currentPlayer = this.playerList[this.currentPlayerNumber]
}

turn.prototype.postBlinds = function() {
	///Add dealer chip
	this.dealerChipViews()
	///small blind
	this.changeCurrentPlayer()
	this.currentPlayer.chips -= this.smallBlind
	this.currentPlayer.currentBet += this.smallBlind
	/// big blind
	this.changeCurrentPlayer()
	this.currentPlayer.chips -= this.bigBlind
	this.currentPlayer.currentBet += this.bigBlind
	///pot
	this.pot += this.smallBlind + this.bigBlind
	/// update info views
	this.updatedInformationViews()
	///calls hole cards
	return this.dealHoleCards()
}

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
	return this.playFlopRound()
}

turn.prototype.playFlopRound = function() {
	inHand = []
	currentBetAmount = this.bigBlind
	for (player in this.playerList) {
		inHand.push(this.playerList[player])
	}
	count = 0
	while (count < 5) {
		this.showButtons()
		this.playerActs()
		this.hideButtons()
		if (this.checkRoundEnd === false) {
			this.changeCurrentPlayer()
			count += 1
		}
		elif {
			return this.dealTurn()
		}
	}
}

turn.prototype.checkRoundEnd = function(inHand) {
	for(var i = 1; i < inHand.length; i++) {
		if(inHand[i].currentBet !== inHand[0].currentBet)
			return false
	}
	return true;
}

turn.prototype.playerActs = function() {
	
}


turn.prototype.showButtons = function() {
	ID = this.currentPlayer.playerID
	$('#player'+ID).find("[Name=betamount]").attr("min",this.currentBetAmount + this.bigBlind)
	$('#player'+ID).find("[Name=betamount]").attr("max",this.currentPlayer.chips)
	$('#player'+ID).find(".buttons").attr("style","display:inline")
}

turn.prototype.hideButtons = function() {
	ID = this.currentPlayer.playerI
	$('#player'+ID).find(".buttons").attr("style","display:none")
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
		$('#player'+ID).find(".currentbet").text("Bet amount: " + this.playerList[player].currentBet)
	}
	$(".pot").text("Current pot amount: " + this.pot)
}

turn.prototype.dealerChipViews = function () {
	ID = this.currentPlayer.playerID
	$('#player'+ID).find(".dealer").html("<img src ='images/dealer.jpg'>")
}

// $('#player'+ID).find(".stack").text("Current Stack: " + player.chips)

$(document).ready(function(){
	var newGame = new game(currentPlayerList)
})


// console.log(player1.hand)
// console.log(player2.hand)

