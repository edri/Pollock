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

// This step creates the polls schemas for the database.
// Receives the mongoose's schema from the first step.
scenario.step("Create database polls schemas", function(Schema) {
    var pollsSchema = new Schema({
    	title: {
    		type: String,
    		required: true
    	},
    	creationDate: {
    		type: Date,
    		required: true
    	},
    	state: {
    		type: String,
    		required: true
    	},
    	questions: [{
    		title: {
    			type: String,
    			required: true
    		},
    		type: {
    			type: String,
    			required: true
    		},
    		choices: [{
    			key: {
    				type: String,
    				required: true
    			},
    			text: {
    				type: String,
    				required: true
    			}
    		}]
    	}],
    	participations: [{
    		id: mongoose.Schema.Types.ObjectId,
    		ref: "participations",
    		required: true
    	}]
    });

    pollsSchema.path("questions").schema.path("choices").schema.path("key").validate(
    	function(questions) {
    		if(!features) {
    			return false;
    		} else if(features.length < 2) {
    			return false;
    		}
    		return true;
    }, "polls need to have at least two questions");

    var participationsSchema = new Schema({
    	participant: {
    		type: String,
    		required: true
    	},
    	submissionDate: {
    		type: date,
    		required: true
    	},
    	poll: {
    		type: mongoose.Schema.Types.ObjectId,
    		ref: "polls",
    		required: true
    	},
    	answers: [{
    		choice: {
    			type: String,
    			required: true
    		}
    	}]
    });

    return this.success(mongoose.model("polls", pollsSchema), mongoose.model("participations", participationsSchema));
});

// This step cleans the model and creates some test data.
// Receives the mongoose polls' and participations' models from the previous step.
scenario.step("Create some data", function(Polls, Participations) {
    // This is an asynchronous step, so we need to return a promise.
    var deferred = this.defer();

    // Clear database.
    Polls.remove({}, function(err) {
    	console.log("Database cleared.\nCreating some polls test data...");

        // Polls test data.
    	var pollsData = [
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
    			],
                participations: []
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
    			],
                participations: []
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
    			],
                participations: []
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
