var copilot = require('api-copilot');
var mongoose = require('mongoose');
var Polls = require('../server/models/polls');
var Participations = require('../server/models/participations');

// Create a REST API's test scenario.
var scenario = new copilot.Scenario({
  name: "Test REST API",
  summary: "Test the created REST API.",
  baseUrl: 'http://localhost:3001/api'
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

// This step cleans the database.
scenario.step("Clean database", function() {
    var deferred = this.defer();

    // Clear database.
    Participations.remove({}, function(err) {
        Polls.remove({}, function(err) {
            console.log("Database cleaned.");
            deferred.resolve(mongoose.Schema);
        });
    });

    // Return the promise object.
    return deferred.promise;
});

// Make POST requests to post some new polls.
scenario.step("POST four new poll", function() {
    // Polls test data.
    var pollsData = [
        {
            _id: "51bb793aca2ab77a3200000d",
            title: "Test1",
            state: "Open",
            questions: [
                {
                    title: "Q1",
                    type: "single",
                    choices: [
                        {
                            key: "R1",
                            text: "La réponse 1."
                        },
                        {
                            key: "R2",
                            text: "La réponse 2."
                        }
                    ]
                },
                {
                    title: "Q2",
                    type: "multiple",
                    choices: [
                        {
                            key: "R1",
                            text: "La réponse 1."
                        }
                    ]
                }
            ]
        },
        {
            // Without manual ID.
            title: "Test2",
            state: "Closed",
            questions: [
                {
                    title: "Q1",
                    type: "multiple",
                    choices: [
                        {
                            key: "R1",
                            text: "La réponse 1."
                        },
                        {
                            key: "R2",
                            text: "La réponse 2."
                        }
                    ]
                },
                {
                    title: "Q2",
                    type: "multiple",
                    choices: [
                        {
                            key: "R1",
                            text: "La réponse 1."
                        }
                    ]
                }
            ]
        },
        {
            _id: "51c35e5ced18cb901d000001",
            title: "Test3",
            state: "Open",
            questions: []
        },
        {
            _id: "51c35e5abc18cb901d000001",
            title: "Test4",
            state: "Open",
            questions: []
        }
    ];

    // Array of requests.
    var requests = [];

    // Convert polls objects into HTTP requests.
    var n = pollsData.length;
    for (var i = 0; i < n; ++i) {
        requests.push(this.post ({
            url: "/polls",
            json: true,
            body: pollsData[i],
            expect: {
                statusCode: {
                    value: [200, 201],
                    message: function(expected, actual) {
                        return "Expected " + expected + " status code but got " + actual;
                    }
                }
            }
        }));
    }

    // Make a POST HTTP request.
    return this.all(requests);
});

// Make a POST request to get all polls and confirm addings.
scenario.step("GET all polls to confirm addings", function() {
    return this.get({
        url: '/polls'
    });
});

// Show polls got from the previous step.
scenario.step("Show got polls", function(response) {
    console.log(response.body);
});

// Make a GET request to a poll.
scenario.step("Get the poll '51bb793aca2ab77a3200000d'", function() {
    return this.get({
        url: '/polls/51bb793aca2ab77a3200000d'
    });
});

// Show the GET request response.
scenario.step("Show the got poll", function(response) {
    console.log(response.body);
});

// Make a PUT request to a poll.
scenario.step("Put the poll '51bb793aca2ab77a3200000d'", function() {
    return this.put({
        url: '/polls/51bb793aca2ab77a3200000d',
        json: true,
        data: {
            title: "Test1New",
            state: "Open",
            questions: []
        }
    });
});

// Show the PUT request response.
scenario.step("Show the poll's put's answer", function(response) {
    console.log(response.body);
});

// Make a DELETE request to delete an existing poll.
scenario.step("DELETE the poll '51c35e5abc18cb901d000001'", function() {
    return this.delete({
        url: '/polls/51c35e5abc18cb901d000001'
    });
});

// Confirm the deletion with the server's response.
scenario.step("Confirm the poll's deletion with the server's response", function(response) {
    console.log(response.body);
});

// Try to make a GET request for the deleted poll.
// We need to receive a 404 status code.
scenario.step("Try to GET the deleted poll ; we expect a 404 status code", function() {
    this.get({
        url: '/polls/51c35e5abc18cb901d000001',
        expect: {
            statusCode: {
                value: [404],
                message: function(expected, actual) {
                    return "The poll still exists.";
                }
            }
        }
    });
});

// Make POST requests to post some new participations.
scenario.step("POST some new participations", function() {
    // Participations test data.
    var participationsData = [
        {
            _id : "51cd793aca2ab77a3200000d",
            participant: "Michel",
            poll: "51bb793aca2ab77a3200000d",
            answers: [
                {
                    choice: "R1"
                }
            ]
        },
        {
            participant: "Jean-Louis",
            poll: "51bb793aca2ab77a3200000d",
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
            participant: "Arthur",
            poll: "51c35e5ced18cb901d000001"
        }
    ];

    // Array of requests.
    var requests = [];

    // Convert participations objects into HTTP requests.
    var n = participationsData.length;
    for (var i = 0; i < n; ++i) {
        requests.push(this.post ({
            url: "/participations",
            json: true,
            body: participationsData[i],
            expect: {
                statusCode: {
                    value: [200, 201],
                    message: function(expected, actual) {
                        return "Expected " + expected + " status code but got " + actual;
                    }
                }
            }
        }));
    }

    // Make a POST HTTP request.
    return this.all(requests);
});

// Make a POST request to get all participations and confirm addings.
scenario.step("GET all participations to confirm addings", function() {
    return this.get({
        url: '/participations'
    });
});

// Show participations got from the previous step.
scenario.step("Show got participations", function(response) {
    console.log(response.body);
});

// Make a GET request to a participation by a poll's ID.
scenario.step("Get the participations of the poll '51bb793aca2ab77a3200000d'", function() {
    return this.get({
        url: '/participations/51bb793aca2ab77a3200000d'
    });
});

// Show the GET request response.
scenario.step("Show the got participations", function(response) {
    console.log(response.body);
});

// Make a PUT request to a participation.
scenario.step("Put the participation '51cd793aca2ab77a3200000d'", function() {
    return this.put({
        url: '/participations/51cd793aca2ab77a3200000d',
        json: true,
        data: {
            participant: "Micheline",
            answers: [
                {
                    choice: "R2"
                }
            ]
        }
    });
});

// Show the PUT request response.
scenario.step("Show the participation's put's answer", function(response) {
    console.log(response.body);
});

// Make a DELETE request to delete an existing participation.
/*scenario.step("DELETE the participation '51cd793aca2ab77a3200000d'", function() {
    return this.delete({
        url: '/participations/51cd793aca2ab77a3200000d'
    });
});

// Confirm the deletion with the server's response.
scenario.step("Confirm the participation's deletion with the server's response", function(response) {
    console.log(response.body);
});*/

module.exports = scenario;
