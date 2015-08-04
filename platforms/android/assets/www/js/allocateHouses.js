(function( angular ) {

	angular.module('got').directive('allocateHouses', function($location, $timeout) {
		var minHouses = ['Starks', 'Baratheon', 'Lannisters'];
		var fourthHouse = 'Greyjoy';
		var fifthHouse = 'Highgarden';
		var sixthHouse = 'Dorne';
				
		return {
			templateUrl: 'allocateHouses.html',
			replace: true,
			link: function(scope) {
				scope.finalCombination = {};
				scope.players = JSON.parse(localStorage.getItem('playerNames'));

				scope.allocateHouses = function() {
					scope.finalCombination = {};
					var shuffledHouses = shuffle(minHouses);
					var shuffledPlayerNames = shuffle(getAllPlayers(scope.players));

					$timeout(function() {
						if(shuffledPlayerNames.length>=3) {
						for(var i =0;i<3;i++) {
							scope.finalCombination[shuffledHouses[i]] = shuffledPlayerNames[i];
						}
					}
					},300);
					
					$timeout(function() {
						if(shuffledPlayerNames.length>=4) {
							scope.finalCombination[fourthHouse] = shuffledPlayerNames[3];
						}
					}, 500);
					
					$timeout(function() {
						if(shuffledPlayerNames.length>=5) {
							scope.finalCombination[fifthHouse] = shuffledPlayerNames[4];
						}	
					}, 700);
					
					$timeout(function() {
						if(shuffledPlayerNames.length==6) {
							scope.finalCombination[sixthHouse] = shuffledPlayerNames[5];
						}
					}, 900);
					
				};

				scope.navigateToPlayerNames = function() {
					$location.path("/playernames");
				};

				var shuffle = function(array) {
				    for (var i = array.length - 1; i > 0; i--) {
				        var j = Math.floor(Math.random() * (i + 1));
				        var temp = array[i];
				        array[i] = array[j];
				        array[j] = temp;
				    }
				    return array;
				};

				var getAllPlayers = function(players) {
					var playerNames = [];
					if(players.player1) {
						playerNames.push(players.player1);
					}if(players.player2) {
						playerNames.push(players.player2);
					}if(players.player3) {
						playerNames.push(players.player3);
					}if(players.player4) {
						playerNames.push(players.player4);
					}if(players.player5) {
						playerNames.push(players.player5);
					}if(players.player6) {
						playerNames.push(players.player6);
					}
					return playerNames;
				}; 
			}
		};
	});

})( this.angular );