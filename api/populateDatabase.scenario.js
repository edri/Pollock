var copilot = require('api-copilot');
var mongoose = require('mongoose');
var Polls = require('../models/polls');
var Participations = require('../models/participations');

// create a database population scenario
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

// This step cleans the model and creates some polls and participations test data.
scenario.step("Create some data", function() {
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
