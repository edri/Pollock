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
    // Create polls' schema.
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
    	}]
    });

    pollsSchema.path("questions").schema.path("choices").schema.path("key").validate(
    	function(questions) {
    		if(!questions) {
    			return false;
    		} else if(questions.length < 2) {
    			return false;
    		}
    		return true;
    }, "polls need to have at least two questions");

    // Creating participations' schema.
    var participationsSchema = new Schema({
    	participant: {
    		type: String,
    		required: true
    	},
    	submissionDate: {
    		type: Date,
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
    	console.log("Database cleared.\nCreating some Polls test data...");

        // Polls test data.
    	var pollsData = [
    		{
                _id: "51bb793aca2ab77a3200000d",
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
                _id: "51c35e5ced18cb901d000001",
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
                _id: "51ab5e5ced18cb901d000001",
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
    	Polls.create(pollsData, function (err) {
    		if (err) {
                console.log("Error on polls' save : " + err);
                // If we cannot create data, the tests process is aborted.
                return this.complete();
            }
            else {

                console.log("Done ! Creating some Polls test data...");

                // Participations test data.
                var participationsData = [
                    {
                        participant: "Michel",
                    	submissionDate: Date.now(),
                    	poll: "51ab5e5ced18cb901d000001",
                    	answers: [
                            {
                                choice: "R1"
                    		},
                            {
                                choice: "R2"
                            }
                        ]
                    },
                    {
                        participant: "Jean-Louis",
                    	submissionDate: Date.now(),
                    	poll: "51bb793aca2ab77a3200000d",
                    	answers: [
                            {
                                choice: "R2"
                            }
                        ]
                    }
                ];

                // Try to create the test data in the database.
            	Participations.create(participationsData, function (err) {
            		if (err) {
                        console.log("Error on participations' save : " + err);
                        // If we cannot create data, the tests process is aborted.
                        return this.complete();
                    }
                    else {
                        console.log("Done !");
                        // Successful operation ; resolve the promise.
                        deferred.resolve([pollsData, participationsData]);
                    }
            	});
            }
    	});
    })

    // Return the promise.
    return deferred.promise;
});

// This step show the added data on the terminal.
// Receives the data added in database, from the previous step.
scenario.step("Log the data", function(data) {
    console.log(data[0].length + " polls added : ");
    console.log(data[0]);
    console.log("\n" + data[1].length + " participations added : ");
    console.log(data[1]);
});

module.exports = scenario;
