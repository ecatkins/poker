var game = function(playerList) {
	this.playerList = playerList
	this.dealerCounter = 0
	this.bigBlind = 30
	this.smallBlind = 15
	var round1 = new round(this.playerList,this.dealerCounter,this.smallBlind,this.bigBlind)
	round1.postBlinds()
}

var round = function(playerList, dealerCounter, smallBlind, bigBlind) {
	this.deck = _.shuffle(deck)
	this.deckCount = 0
	this.pot = 0
	this.playerList = playerList
	this.dealerCounter = dealerCounter
	this.smallBlind = smallBlind
	this.bigBlind = bigBlind
	this.currentPlayerNumber = this.dealerCounter
	this.currentPlayer = this.playerList[this.currentPlayerNumber]
	this.inHand = []
	this.currentBetAmount = this.bigBlind
}



round.prototype.postBlinds = function() {
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
	/// Pushes all players to the active list
	this.updateInHand()
	///calls hole cards
	return this.dealHoleCards()
}




////////////////// PRE FLOP ACTION /////////////////  /////////////////  /////////////////  ///////////////// 

round.prototype.dealHoleCards = function() {
	var playerList = this.playerList
	for (player in playerList) {
		this.deck.slice(this.deckCount,this.deckCount+2).forEach(function(card) {
			playerList[player].addCard(card)
		})
	dealHoleCardsViews(playerList[player])
		this.deckCount += 2
	}
	this.updatedInformationViews(playerList)
	return this.playPreFlopRound()
}

round.prototype.playPreFlopRound = function() {
	this.hideButtons()
	this.updatedInformationViews()
	this.changeCurrentPlayer()
	this.updateInHand()
	this.showButtons()
	if (this.currentPlayer.inHand === true) {
		this.playerActsPreFlop()
	}
	else {
		this.changeCurrentPlayer()
		return this.playPreFlopRound()
	}
}
	

/// this function waits for a player to act i.e. click on something, at end of round, deals turn
round.prototype.playerActsPreFlop = function() {
	var currentPlayer = this.currentPlayer
	var ID = currentPlayer.playerID
	var self = this
	$('#player'+ID).find(".fold").on('click', function () {
		currentPlayer.inHand = false
		$('#player'+ID).find("img").hide()
		if (self.checkRoundEnd() === false) {
			return self.playPreFlopRound()
		}
		else {
			return self.dealFlop()
		}
	} )
	$('#player'+ID).find(".call").on('click', function () {
		var callDiff = self.currentBetAmount - self.currentPlayer.currentBet
		self.pot += callDiff
		self.currentPlayer.chips -=  callDiff
		self.currentPlayer.currentBet = self.currentBetAmount
		if (self.checkRoundEnd() === false) {
			return self.playPreFlopRound()
		}
		else {
			return self.dealFlop()
		}
	})
	$('#player'+ID).find(".bet").on('click', function () {
		var betSize = parseInt($('#player'+ID).find('[name=betamount]').val());
		var betDiff = self.currentBetAmount - self.changeCurrentPlayer.currentBet
		self.pot += betDiff
		self.currentBetAmount = betSize
		self.currentPlayer.chips -= betDiff
		self.currentPlayer.currentBet = self.currentBetAmount
		if (self.checkRoundEnd() === false) {
			return self.playPreFlopRound()
		}
		else {
			return self.dealFlop()
		}
	})
}


//////////////////FLOP ACTION /////////////////  /////////////////  /////////////////  ///////////////// 



round.prototype.dealFlop = function () {
	console.log(this.playerList)
	var playerList = this.playerList
	this.deck.slice(this.deckCount,this.deckCount+3).forEach(function(card){
		for (player in playerList) {
			playerList[player].addCard(card)
		}
	}) 
	dealFlopViews(playerList)
	this.deckCount += 3
	this.updatedInformationViews(playerList)
	return this.resetForFlop()
}

round.prototype.resetForFlop = function () {
	this.currentPlayer =this.playerList[this.currentPlayerNumber]
	for (player in this.playerList) {
		this.playerList[player].currentBet =0
	}
	return this.playFlopRound()
}

round.prototype.playFlopRound = function() {
	this.hideButtons()
	this.updatedInformationViews()
	this.changeCurrentPlayer()
	this.updateInHand()
	this.showButtons()
	if (this.currentPlayer.inHand === true) {
		this.playerActsFlop()
	}
	else {
		this.changeCurrentPlayer()
		return this.playFlopRound()
	}
}


round.prototype.playerActsFlop = function() {
	var currentPlayer = this.currentPlayer
	var ID = currentPlayer.playerID
	var self = this
	$('#player'+ID).find(".fold").on('click', function () {
		currentPlayer.inHand = false
		$('#player'+ID).find("img").hide()
		if (self.checkRoundEnd() === false) {
			return self.playFlopRound()
		}
		else {
			return self.dealTurn()
		}
	} )
	$('#player'+ID).find(".call").on('click', function () {
		var callDiff = self.currentBetAmount - self.currentPlayer.currentBet
		self.pot += callDiff
		self.currentPlayer.chips -=  callDiff
		self.currentPlayer.currentBet = self.currentBetAmount
		if (self.checkRoundEnd() === false) {
			return self.playFlopRound()
		}
		else {
			return self.dealTurn()
		}
	})
	$('#player'+ID).find(".bet").on('click', function () {
		var betSize = parseInt($('#player'+ID).find('[name=betamount]').val());
		var betDiff = self.currentBetAmount - self.changeCurrentPlayer.currentBet
		self.pot += betDiff
		self.currentBetAmount = betSize
		self.currentPlayer.chips -= betDiff
		self.currentPlayer.currentBet = self.currentBetAmount
		if (self.checkRoundEnd() === false) {
			return self.playFlopRound()
		}
		else {
			return self.dealTurn()
		}
	})
}


////////////////// TURN ACTION /////////////////  /////////////////  /////////////////  ///////////////// 

round.prototype.dealTurn = function () {
	console.log(this.playerList)
	var playerList = this.playerList
	this.deck.slice(this.deckCount,this.deckCount+1).forEach(function(card){
		for (player in playerList) {
			playerList[player].addCard(card)
		}
	}) 
	dealTurnViews(playerList)
	this.deckCount += 1
	this.updatedInformationViews(playerList)
	return this.resetForTurn()
}

round.prototype.resetForTurn = function () {
	this.currentPlayer =this.playerList[this.currentPlayerNumber]
	for (player in this.playerList) {
		this.playerList[player].currentBet =0
	}
	return this.playTurnRound()
}

round.prototype.playTurnRound = function() {
	this.hideButtons()
	this.updatedInformationViews()
	this.changeCurrentPlayer()
	this.updateInHand()
	this.showButtons()
	if (this.currentPlayer.inHand === true) {
		this.playerActsTurn()
	}
	else {
		this.changeCurrentPlayer()
		return this.playTurnRound()
	}
}

round.prototype.playerActsTurn = function() {
	var currentPlayer = this.currentPlayer
	var ID = currentPlayer.playerID
	var self = this
	$('#player'+ID).find(".fold").on('click', function () {
		currentPlayer.inHand = false
		$('#player'+ID).find("img").hide()
		if (self.checkRoundEnd() === false) {
			return self.playTurnRound()
		}
		else {
			return self.dealRiver()
		}
	} )
	$('#player'+ID).find(".call").on('click', function () {
		var callDiff = self.currentBetAmount - self.currentPlayer.currentBet
		self.pot += callDiff
		self.currentPlayer.chips -=  callDiff
		self.currentPlayer.currentBet = self.currentBetAmount
		if (self.checkRoundEnd() === false) {
			return self.playTurnRound()
		}
		else {
			return self.dealRiver()
		}
	})
	$('#player'+ID).find(".bet").on('click', function () {
		var betSize = parseInt($('#player'+ID).find('[name=betamount]').val());
		var betDiff = self.currentBetAmount - self.changeCurrentPlayer.currentBet
		self.pot += betDiff
		self.currentBetAmount = betSize
		self.currentPlayer.chips -= betDiff
		self.currentPlayer.currentBet = self.currentBetAmount
		if (self.checkRoundEnd() === false) {
			return self.playTurnRound()
		}
		else {
			return self.dealRiver()
		}
	})
}

////////////////// RIVER ACTION /////////////////  /////////////////  /////////////////  ///////////////// 

round.prototype.dealRiver = function () {
	console.log(this.playerList)
	var playerList = this.playerList
	this.deck.slice(this.deckCount,this.deckCount+1).forEach(function(card){
		for (player in playerList) {
			playerList[player].addCard(card)
		}
	}) 
	dealRiverViews(playerList)
	this.deckCount += 1
	this.updatedInformationViews(playerList)
	return this.resetForRiver()
}

round.prototype.resetForRiver = function () {
	this.currentPlayer =this.playerList[this.currentPlayerNumber]
	for (player in this.playerList) {
		this.playerList[player].currentBet =0
	}
	return this.playRiverRound()
}

round.prototype.playRiverRound = function() {
	this.hideButtons()
	this.updatedInformationViews()
	this.changeCurrentPlayer()
	this.updateInHand()
	this.showButtons()
	if (this.currentPlayer.inHand === true) {
		this.playerActsRiver()
	}
	else {
		this.changeCurrentPlayer()
		return this.playRiverRound()
	}
}


round.prototype.playerActsRiver = function() {
	var currentPlayer = this.currentPlayer
	var ID = currentPlayer.playerID
	var self = this
	$('#player'+ID).find(".fold").on('click', function () {
		currentPlayer.inHand = false
		$('#player'+ID).find("img").hide()
		if (self.checkRoundEnd() === false) {
			return self.playRiverRound()
		}
		else {
			return console.log("FINISHED")
		}
	} )
	$('#player'+ID).find(".call").on('click', function () {
		var callDiff = self.currentBetAmount - self.currentPlayer.currentBet
		self.pot += callDiff
		self.currentPlayer.chips -=  callDiff
		self.currentPlayer.currentBet = self.currentBetAmount
		if (self.checkRoundEnd() === false) {
			return self.playRiverRound()
		}
		else {
			return console.log("FINISHED")
		}
	})
	$('#player'+ID).find(".bet").on('click', function () {
		var betSize = parseInt($('#player'+ID).find('[name=betamount]').val());
		var betDiff = self.currentBetAmount - self.changeCurrentPlayer.currentBet
		self.pot += betDiff
		self.currentBetAmount = betSize
		self.currentPlayer.chips -= betDiff
		self.currentPlayer.currentBet = self.currentBetAmount
		if (self.checkRoundEnd() === false) {
			return self.playRiverRound()
		}
		else {
			console.log("FINISHED")
		}
	})
}

////////////////// COMPARE CARDS /////////////////  /////////////////  /////////////////  ///////////////// 



////////////////// MISC////////////////

///this function makes the player list is circular
round.prototype.changeCurrentPlayer = function() {
	var numPlayers = this.playerList.length
	if (this.currentPlayerNumber === numPlayers - 1) {
		this.currentPlayerNumber = 0
	}
	else {
		this.currentPlayerNumber += 1
	}
	this.currentPlayer = this.playerList[this.currentPlayerNumber]
}

/// this function sets the list that shows who hasn't folded
round.prototype.updateInHand = function() {
	this.hand = []
	for (player in this.playerList) {
		if (this.playerList[player].inHand != false) {
			this.inHand.push(this.playerList[player])
		}	
	}
}

round.prototype.checkRoundEnd = function(inHand) {
	for(var i = 1; i < this.inHand.length; i++) {
		if(this.inHand[i].currentBet !== this.inHand[0].currentBet)
			return false
	}
	return true;
}


round.prototype.showButtons = function() {
	var ID = this.currentPlayer.playerID
	$('#player'+ID).find("[Name=betamount]").attr("min",this.currentBetAmount + this.bigBlind)
	$('#player'+ID).find("[Name=betamount]").attr("max",this.currentPlayer.chips)
	$('#player'+ID).find(".buttons").attr("style","display:inline")
}

round.prototype.hideButtons = function() {
	ID = this.currentPlayer.playerID
	$('#player'+ID).find(".buttons").attr("style","display:none")
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

round.prototype.updatedInformationViews = function() {
	for (player in this.playerList) {
		ID = this.playerList[player].playerID
		$('#player'+ID).find(".stack").text("Current Stack: " + this.playerList[player].chips)
		$('#player'+ID).find(".currentbet").text("Bet amount: " + this.playerList[player].currentBet)
	}
	$(".pot").text("Current pot amount: " + this.pot)
}

round.prototype.dealerChipViews = function () {
	ID = this.currentPlayer.playerID
	$('#player'+ID).find(".dealer").html("<img src ='images/dealer.jpg'>")
}

// $('#player'+ID).find(".stack").text("Current Stack: " + player.chips)

$(document).ready(function(){
	var newGame = new game(currentPlayerList)
})




