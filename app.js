

var constants = new (function() {
var numMatches=null;    
    
    this.getNumMatches = function() { return numMatches; };
})();

var	currentSessionOpen = false;
var	previousCard = null;
var numPairs = 0;

function createDeck(row,columns) {
	var rows = row;
	var cols = columns;
	var key = createRandom(rows,cols);
	var deck = {};
    
	deck.rows = [];

	for(var i = 0; i < rows; i++) {
		var row = {};
		row.cards = [];
		
		for (var j = 0; j < cols; j++) {
			var card = {};
			card.isFaceUp = false;
			card.item = key.pop();
			row.cards.push(card);
		}
		deck.rows.push(row);
	}
	return deck;
}

function removeByIndex(arr, index) {
    arr.splice(index, 1);
}

function insertByIndex(arr, index, item) {
	arr.splice(index, 0, item);
}

function createRandom(rows,columns) {
	var correectmatches = (rows * columns) / 2;
	var displayItems = [];
	var answers = [];
	var alphabets = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'
					, 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R'
					, 'S', 'T', 'U', 'W', 'X', 'Y', 'Z'];
	
	
	var items = alphabets;
	for (var i = 0; i < correectmatches * 2; i++) {
		displayItems.push(i); 
	}
	
	for (var n = 0; n < correectmatches; n++) {
		
		var randLetter = Math.floor((Math.random() * items.length));
		var letter = items[randLetter];
		removeByIndex(items, randLetter);
	
		var randPool = Math.floor((Math.random() * displayItems.length));
		
		
		insertByIndex(answers, displayItems[randPool], letter);
		
		removeByIndex(displayItems, randPool);
		
		randPool = Math.floor((Math.random() * displayItems.length));
		insertByIndex(answers, displayItems[randPool], letter);

		
		removeByIndex(displayItems, randPool);
	}
	return answers;
} 

var app = angular.module('myApp', ['ngAnimate']);

app.controller("gameController", function($scope, $timeout) {
   
	$scope.deck = createDeck(2,2);
	var flipsAttemted=0;
	var flipsCorrect=0;
    $scope.correct=0;
    $scope.attemted=0;
    $scope.names = [1,2,3,4,5,6,7,8,9];
	$scope.check = function(card) {
		if (currentSessionOpen && previousCard != card && previousCard.item == card.item && !card.isFaceUp) {
			card.isFaceUp = true;
			previousCard = null;
			currentSessionOpen = false;
			numPairs++;
            flipsAttemted+=1;
            $scope.correct=flipsAttemted;
		} else if(currentSessionOpen && previousCard != card && previousCard.item != card.item && !card.isFaceUp) {
			
			card.isFaceUp = true;
			currentSessionOpen = false;			
			$timeout(function() {
				previousCard.isFaceUp = card.isFaceUp = false;
				previousCard = null;
		
			}, 400);
		} else {
			card.isFaceUp = true;
			currentSessionOpen = true;
			previousCard = card;
            flipsCorrect+=1;
            $scope.attemted=flipsCorrect;
		}	
		
	} 
    $scope.changeView=function(a,b){
       
         $scope.deck = createDeck(a,b);
         $scope.correct=0;
    $scope.attemted=0;
     flipsAttemted=0;
	 flipsCorrect=0;
    }

}); 


