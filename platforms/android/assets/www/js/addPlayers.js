(function( angular ) {

	angular.module('got').directive('addPlayers', function($location, $timeout) {
		return {
			templateUrl: 'addPlayers.html',
			scope: {
				players: '='
			},
			replace: true,
			link: function(scope, element) {
				var allPlayers = {"player1":"","player5":"","player2":"","player3":"","player4":"","player6":"" };
				scope.savedPlayers = JSON.parse(localStorage.getItem('playerNames')) || allPlayers;
				scope.hasStoredData = scope.savedPlayers && scope.savedPlayers !== allPlayers && scope.savedPlayers && scope.savedPlayers["player1"]!=="" && scope.savedPlayers["player2"]!=="" && scope.savedPlayers["player3"]!=="";
				scope.players = JSON.parse(localStorage.getItem('playerNames')) || allPlayers;

				scope.save = function() {
					angular.element(element.find('button')[1]).attr('disabled', 'disabled');
					var hasAtleastThreePlayers = scope.players && scope.players["player1"]!=="" && scope.players["player2"]!=="" && scope.players["player3"]!=="";

				if(hasAtleastThreePlayers) {
					try{
					     window.localStorage.setItem('playerNames', JSON.stringify(scope.players));
					  } catch (e) {
					      alert("There seems to be a problem. Please try after some time.");
					      angular.element(element.find('button')[1]).attr('disabled', '');
					  }
						
						$timeout(function() {
							scope.savedPlayers = scope.players;
							scope.allocateHouses();
							angular.element(element.find('button')[1]).attr('disabled', '');
						}, 200);
				}else {
					alert("First 3 players are mandatory.. bro !")
				}
				angular.element(element.find('button')[1]).attr('disabled', '');
				};

				scope.allocateHouses = function() {
					$location.path("/allocatehouses");
				};
			}
		};
	});

})( this.angular );