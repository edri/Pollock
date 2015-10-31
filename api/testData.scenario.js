var copilot = require('api-copilot');
var mongoose = require('mongoose');

// create an API scenario
var scenario = new copilot.Scenario({
  name: "Database population's scenario",
  summary: "Populate some data into our mongo database."
});

// This step try to connect to database.
scenario.step("Connect to database", function() {
    // This is an asynchronous step, so we need to return a promise.
    var deferred = this.defer();

    mongoose.connect('mongodb://localhost/pollock', function(err) {
    	if(err) {
            console.log("Error when connecting : " + err);
            // If we cannot connect the database, the tests process is aborted.
            return this.complete();
    	} else {
    		console.log("Connected to database.");
            deferred.resolve(mongoose.Schema);
    	}
    });

    // Return the promise object.
    return deferred.promise;
})

// This step creates a default polls schema for the database.
// Receives the mongoose's schema from the first step.
scenario.step("Create database polls schema", function(Schema) {
    var pollsSchema = new Schema({
    	title: String,
    	creationDate: Date,
    	state: String,
    	questions: [{
    		title: String,
    		type: {type: String},
    		choices: [{
    			key: String,
    			text: String,
    			participations: [{
    				participant: String,
    				submissionDate: Date
    			}]
    		}]
    	}]
    });

    return mongoose.model("polls", pollsSchema);
});

// This step cleans the model and creates some test data.
// Receives the mongoose polls' model from the previous step.
scenario.step("Create some data", function(Polls) {
    // This is an asynchronous step, so we need to return a promise.
    var deferred = this.defer();

    // Clear database.
    Polls.remove({}, function(err) {
    	console.log("Database cleared.\nCreating some test data...");

        // Test data.
    	var data = [
    		{
    			title: "Test1",
    			creationDate: Date.now(),
    			state: "Open",
    			questions: [
    				{
    					title: "Q1",
    					type: "Easy",
    					choices : [
    						{
    							key: "R1",
    							text: "La réponse 1."
    						},
    						{
    							key: "R2",
    							text: "La réponse 2."
    						}
    					]
    				}
    			]
    		},
    		{
    			title: "Test2",
    			creationDate: new Date(2015, 3, 29, 14, 54, 59, 0),
    			state: "Close",
    			questions: [
    				{
    					title: "Q1",
    					type: "Easy",
    					choices : [
    						{
    							key: "R1",
    							text: "La réponse 1."
    						},
    						{
    							key: "R2",
    							text: "La réponse 2."
    						}
    					]
    				}
    			]
    		},
    		{
    			title: "Test3",
    			creationDate: Date.now(),
    			state: "Close",
    			questions: [
    				{
    					title: "Q1",
    					type: "Easy",
    					choices : [
    						{
    							key: "R1",
    							text: "La réponse 1."
    						},
    						{
    							key: "R2",
    							text: "La réponse 2."
    						}
    					]
    				}
    			]
    		}
    	];

        // Try to create the test data in the database.
    	Polls.create(data, function (err) {
    		if (err) {
                console.log("Error on save : " + err);
                // If we cannot create data, the tests process is aborted.
                return this.complete();
            }
            else {
                // Successful operation ; resolve the promise.
                deferred.resolve(data);
            }
    	});
    })

    // Return the promise.
    return deferred.promise;
});

// This step show the added data on the terminal.
// Receives the data added in database, from the previous step.
scenario.step("Log the data", function(data) {
    console.log(data.length + " polls added : ");
    console.log(data);
});

module.exports = scenario;
