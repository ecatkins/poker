var game = function(playerList) {
	this.playerList = playerList
	this.dealerCounter = 0
	this.smallBlind = 15
	this.bigBlind = 30
	this.gamePlay()
}

game.prototype.gamePlay = function() {
	thisGame = this
	var cycle1 = new round(this.playerList,this.dealerCounter,this.smallBlind,this.bigBlind,thisGame)
	return cycle1.postBlinds()
}



var round = function(playerList, dealerCounter, smallBlind, bigBlind, thisGame) {
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
	this.game = thisGame
	this.endRoundCounter = 0
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
	console.log("After Hole cards")
	console.log(playerList)


	this.updatedInformationViews(playerList)
	return this.playPreFlopRound()
}

round.prototype.playPreFlopRound = function() {
	this.hideButtons()
	this.updatedInformationViews()
	this.changeCurrentPlayer()
	this.updateInHand()
	if (this.inHand.length === 1) {
		return this.awardPot(this.inHand[0])
	}
	this.showButtons()
	if (this.currentPlayer.inHand === true) {
		this.endRoundCounter += 1
		return this.playerActsPreFlop()
	}
	else {
		this.hideButtons()
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
		$('#player'+ID).find(".card").hide()
		$('#player'+ID).find(".fold").off("click")
		$('#player'+ID).find(".call").off("click")
		$('#player'+ID).find(".bet").off("click")
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
		$('#player'+ID).find(".call").off("click")
		$('#player'+ID).find(".fold").off("click")
		$('#player'+ID).find(".bet").off("click")
		if (self.checkRoundEnd() === false) {
			return self.playPreFlopRound()
		}
		else {
			return self.dealFlop()
		}
	})

	$('#player'+ID).find(".bet").on('click', function () {
		// var betSize = parseInt($('#player'+ID).find('[name=betamount]').val()); NOTE: got rid of 'parseInt'
		var betSize = ($('#player'+ID).find('[name=betamount]').val());
		var betDiff = betSize - self.currentPlayer.currentBet
		self.pot += betDiff
		self.currentBetAmount = betSize
		self.currentPlayer.chips -= betDiff
		self.currentPlayer.currentBet = betSize
		$('#player'+ID).find(".bet").off("click")
		$('#player'+ID).find(".call").off("click")
		$('#player'+ID).find(".fold").off("click")
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
	var playerList = this.playerList
	this.deck.slice(this.deckCount,this.deckCount+3).forEach(function(card){
		for (player in playerList) {
			playerList[player].addCard(card)
		}
	}) 
	console.log("After Flop")
	console.log(playerList)
	dealFlopViews(playerList)
	this.deckCount += 3
	this.updatedInformationViews(playerList)
	return this.resetForFlop()
}

round.prototype.resetForFlop = function () {
	this.endRoundCounter = 0
	this.hideButtons()
	this.currentBetAmount = 0
	this.currentPlayerNumber = this.dealerCounter
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
	if (this.inHand.length === 1) {
		return this.awardPot(this.inHand[0])
	}
	this.showButtons()
	if (this.currentPlayer.inHand === true) {
		this.endRoundCounter += 1
		return this.playerActsFlop()
	}
	else {
		this.hideButtons()
		return this.playFlopRound()
	}
}


round.prototype.playerActsFlop = function() {
	var currentPlayer = this.currentPlayer
	var ID = currentPlayer.playerID
	var self = this
	$('#player'+ID).find(".fold").on('click', function () {
		currentPlayer.inHand = false
		$('#player'+ID).find(".card").hide()
		$('#player'+ID).find(".fold").off("click")
		$('#player'+ID).find(".call").off("click")
		$('#player'+ID).find(".bet").off("click")
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
		$('#player'+ID).find(".fold").off("click")
		$('#player'+ID).find(".call").off("click")
		$('#player'+ID).find(".bet").off("click")
		if (self.checkRoundEnd() === false) {
			return self.playFlopRound()
		}
		else {
			return self.dealTurn()
		}
	})
	$('#player'+ID).find(".bet").on('click', function () {
	// var betSize = parseInt($('#player'+ID).find('[name=betamount]').val()); NOTE: got rid of 'parseInt'
		var betSize = ($('#player'+ID).find('[name=betamount]').val());
		var betDiff = betSize - self.currentPlayer.currentBet
		self.pot += betDiff
		self.currentBetAmount = betSize
		self.currentPlayer.chips -= betDiff
		self.currentPlayer.currentBet = betSize
		$('#player'+ID).find(".fold").off("click")
		$('#player'+ID).find(".call").off("click")
		$('#player'+ID).find(".bet").off("click")
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
	var playerList = this.playerList
	this.deck.slice(this.deckCount,this.deckCount+1).forEach(function(card){
		for (player in playerList) {
			playerList[player].addCard(card)
		}
	}) 
	console.log("After Turn")
	console.log(playerList)
	dealTurnViews(playerList)
	this.deckCount += 1
	this.updatedInformationViews(playerList)
	return this.resetForTurn()
}

round.prototype.resetForTurn = function () {
	this.hideButtons()
	this.endRoundCounter = 0
	this.currentBetAmount = 0
	this.currentPlayer =this.playerList[this.dealerCounter]
	for (player in this.playerList) {
		this.playerList[player].currentBet = 0
	}
	return this.playTurnRound()
}

round.prototype.playTurnRound = function() {
	this.hideButtons()
	this.updatedInformationViews()
	this.changeCurrentPlayer()
	this.updateInHand()
	if (this.inHand.length === 1) {
		return this.awardPot(this.inHand[0])
	}
	this.showButtons()
	if (this.currentPlayer.inHand === true) {
		this.endRoundCounter += 1
		return this.playerActsTurn()
	}
	else {
		this.hideButtons()
		return this.playTurnRound()
	}
}

round.prototype.playerActsTurn = function() {
	var currentPlayer = this.currentPlayer
	var ID = currentPlayer.playerID
	var self = this
	$('#player'+ID).find(".fold").on('click', function () {
		currentPlayer.inHand = false
		$('#player'+ID).find(".card").hide()
		$('#player'+ID).find(".fold").off("click")
		$('#player'+ID).find(".call").off("click")
		$('#player'+ID).find(".bet").off("click")
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
		$('#player'+ID).find(".fold").off("click")
		$('#player'+ID).find(".call").off("click")
		$('#player'+ID).find(".bet").off("click")
		if (self.checkRoundEnd() === false) {
			return self.playTurnRound()
		}
		else {
			return self.dealRiver()
		}
	})
	$('#player'+ID).find(".bet").on('click', function () {
// var betSize = parseInt($('#player'+ID).find('[name=betamount]').val()); NOTE: got rid of 'parseInt'
		var betSize = ($('#player'+ID).find('[name=betamount]').val());
		var betDiff = betSize - self.currentPlayer.currentBet
		self.pot += betDiff
		self.currentBetAmount = betSize
		self.currentPlayer.chips -= betDiff
		self.currentPlayer.currentBet = betSize
		$('#player'+ID).find(".fold").off("click")
		$('#player'+ID).find(".call").off("click")
		$('#player'+ID).find(".bet").off("click")
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
	var playerList = this.playerList
	this.deck.slice(this.deckCount,this.deckCount+1).forEach(function(card){
		for (player in playerList) {
			playerList[player].addCard(card)
		}
	}) 
	console.log("After River")
	console.log(playerList)
	dealRiverViews(playerList)
	this.deckCount += 1
	this.updatedInformationViews(playerList)
	return this.resetForRiver()
}

round.prototype.resetForRiver = function () {
	this.hideButtons()
	this.currentBetAmount = 0
	this.currentPlayer =this.playerList[this.dealerCounter]
	this.endRoundCounter = 0
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
	if (this.inHand.length === 1) {
		return this.awardPot(this.inHand[0])
	}
	this.showButtons()
	if (this.currentPlayer.inHand === true) {
		this.endRoundCounter  += 1
		return this.playerActsRiver()
	}
	else {
		this.hideButtons()
		return this.playRiverRound()
	}
}


round.prototype.playerActsRiver = function() {
	var currentPlayer = this.currentPlayer
	var ID = currentPlayer.playerID
	var self = this
	$('#player'+ID).find(".fold").on('click', function () {
		currentPlayer.inHand = false
		$('#player'+ID).find(".card").hide()
		$('#player'+ID).find(".fold").off("click")
		$('#player'+ID).find(".call").off("click")
		$('#player'+ID).find(".bet").off("click")
		if (self.checkRoundEnd() === false) {
			return self.playRiverRound()
		}
		else {
			console.log("FINISHED")
			return self.handComparison()
		}
	} )
	$('#player'+ID).find(".call").on('click', function () {
		var callDiff = self.currentBetAmount - self.currentPlayer.currentBet
		self.pot += callDiff
		self.currentPlayer.chips -=  callDiff
		self.currentPlayer.currentBet = self.currentBetAmount
		$('#player'+ID).find(".fold").off("click")
		$('#player'+ID).find(".call").off("click")
		$('#player'+ID).find(".bet").off("click")
		if (self.checkRoundEnd() === false) {
			return self.playRiverRound()
		}
		else {
			return self.handComparison()
		}
	})
	$('#player'+ID).find(".bet").on('click', function () {
// var betSize = parseInt($('#player'+ID).find('[name=betamount]').val()); NOTE: got rid of 'parseInt'
		var betSize = ($('#player'+ID).find('[name=betamount]').val());
		var betDiff = betSize - self.currentPlayer.currentBet
		self.pot += betDiff
		self.currentBetAmount = betSize
		self.currentPlayer.chips -= betDiff
		self.currentPlayer.currentBet = betSize
		$('#player'+ID).find(".fold").off("click")
		$('#player'+ID).find(".call").off("click")
		$('#player'+ID).find(".bet").off("click")
		if (self.checkRoundEnd() === false) {
			return self.playRiverRound()
		}
		else {
			return self.handComparison()	
		}
	})
}

////////////////// COMPARE CARDS /////////////////  /////////////////  /////////////////  ///////////////// 
function compareIndex(player1, player2) {
  if (player1.handScore()[0] < player2.handScore()[0]){
    return -1;
  }
  if (player1.handScore()[0] > player2.handScore()[0]){
    return 1;
  }
  return 0
}

function compareScore(player1, player2) {
  if (player1.handScore()[1] < player2.handScore()[1]){
    return -1;
  }
  if (player1.handScore()[1] > player2.handScore()[1]){
    return 1;
  }
  return 0
}


function indexComparison(inHandPlayers) {
	var sameHand = []
	for(var i = 0; i < inHandPlayers.length; i++) {
		if(inHandPlayers[i].handScore()[0] === inHandPlayers[0].handScore()[0]) {
			sameHand.push(inHandPlayers[i])
		}
		else {
			console.log(sameHand)
			return sameHand
		}
	}
	console.log(sameHand)
	return sameHand
}

round.prototype.handComparison = function() {
	this.hideButtons()
	this.updatedInformationViews()
	this.updateInHand()
	this.inHand.sort(compareIndex)
	var winningPLayer = null
	if (indexComparison(this.inHand).length === 1) {
		winningPlayer = this.inHand[0]
	}
	else {
		var sameHand = indexComparison(this.inHand)
		sameHand.sort(compareScore)
		winningPlayer = sameHand[0]
	}
	onsole.log(winningPlayer.handScore())
	return this.awardPot(winningPlayer)
}

round.prototype.awardPot  = function(winningPlayer) {
	winningPlayer.chips += this.pot
	///Remove dealer chip
	$(".dealer").empty()
	///Remove all cards from players but show divs
	$(".card").empty()
	$(".card").show()
	///All players in hand
	this.resetPlayerInHand()
	///Update information
	this.updatedInformationViews()
	this.changeDealerCounter()
	return this.game.gamePlay()
}


////////////////// MISC////////////////

///this function makes the player list is circular

round.prototype.changeDealerCounter = function() {
	var numPlayers = this.playerList.length
	if (this.currentPlayerNumber === numPlayers - 1) {
		this.game.dealerCounter = 0
	}
	else {
		this.game.dealerCounter += 1
	}
}

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
	this.inHand = []
	for (player in this.playerList) {
		if (this.playerList[player].inHand != false) {
			this.inHand.push(this.playerList[player])
		}	
	}
}

round.prototype.checkRoundEnd = function() {
	if (this.endRoundCounter < this.inHand.length) {
		return false
	}
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

round.prototype.resetPlayerInHand = function () {
	this.playerList.forEach(function(player) {
		player.inHand = true
		player.clearHand()
		player.currentBet = 0
	})
}

// $('#player'+ID).find(".stack").text("Current Stack: " + player.chips)

$(document).ready(function(){
	var newGame = new game(currentPlayerList)
})




