//require the friends data file
var friends = require('../data/friends');

//Routes
module.exports = function(app){

	// API GET Requests
	app.get('/api/friends', function(req, res){
		res.json(friends);
	});

	// API POST Requests
	app.post('/api/friends', function(req, res){

//Comparing user with their best friend match 

//Object to hold the best match
		var bestMatch = {
			name: "",
			photo: "",
			friendDifference: 1000,
		};

		// Here we take the result of the user's survey POST and parse it.
		var userData 	= req.body;
		console.log(req.body)
		console.log(req.body.scores)
		
	
		var userName 	= req.body.name;
		var userPhoto 	= req.body.photo;
		var userScores 	= userData.scores;

		var number = parseInt(userData.scores)
		console.log(number)
		console.log(req.body.photo)
		var totalDifference = 0;

		// Loop through all the friend possibilities in the database. 
		for  (var i=0; i< friends.length; i++) {

			console.log(friends[i].name);
			
			totalDifference = 0;

			// Loop through all the scores of each friend
			for (var j=0; j< friends[i].scores[j]; j++){
				console.log(friends[i].scores[j])
				// We calculate the difference between the scores and sum them into the totalDifference
				totalDifference = Math.abs(parseInt(userScores[j]) - Math.abs(parseInt(friends[i].scores[j])));
				console.log(totalDifference)
				// If the sum of differences is less then the differences of the current "best match"
				if (totalDifference <= bestMatch.friendDifference){

					// Reset the bestMatch to be the new friend. 
					bestMatch.name = friends[i].name;
					bestMatch.photo = friends[i].photo;
					bestMatch.friendDifference = totalDifference;
					console.log(bestMatch.name)
					console.log(bestMatch.friendDifference)
				}
			}
		}

		// Finally save the user's data to the database (this has to happen AFTER the check. otherwise,
		// the database will always return that the user is the user's best friend).
		friends.push(userData);

		// Return a JSON with the user's bestMatch. This will be used by the HTML in the next page. 
	 res.json(bestMatch);

	});

}