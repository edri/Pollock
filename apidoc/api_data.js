define({ "api": [
  {
    "type": "GET",
    "url": "/participations",
    "title": "",
    "name": "GetParticipations",
    "group": "participations",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[\n  {\n    \"_id\": \"56360d178b275b6b2519d180\",\n    \"participant\": \"Paul\",\n    \"submissionDate\": \"2015-11-01T13:01:11.266Z\",\n    \"poll\": \"51ab5e5ced18cb901d000001\",\n    \"__v\": 1,\n    \"answers\": [\n      {\n        \"choice\": \"R1\",\n        \"_id\": \"56360d178b275b6b2519d182\"\n      }\n    ]\n  },\n  {\n    \"_id\": \"563623da29193f7036169dde\",\n    \"poll\": \"51ab5e5ced18cb901a000001\",\n    \"submissionDate\": \"2015-11-01T14:38:18.420Z\",\n    \"participant\": \"Mathieu\",\n    \"__v\": 0,\n    \"answers\": []\n  }\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/api.js",
    "groupTitle": "participations"
  },
  {
    "type": "GET",
    "url": "/participations",
    "title": "",
    "name": "GetParticipations",
    "group": "participations",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "<p>Number</p> ",
            "optional": false,
            "field": "pollId",
            "description": "<p>Polls unique ID.</p> "
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[\n  {\n    \"_id\": \"56360d178b275b6b2519d180\",\n    \"participant\": \"Paul\",\n    \"submissionDate\": \"2015-11-01T13:01:11.266Z\",\n    \"poll\": \"51ab5e5ced18cb901d000001\",\n    \"__v\": 1,\n    \"answers\": [\n      {\n        \"choice\": \"R1\",\n        \"_id\": \"56360d178b275b6b2519d182\"\n      }\n    ]\n  }\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/api.js",
    "groupTitle": "participations"
  },
  {
    "type": "DELETE",
    "url": "/polls/:pollId",
    "title": "",
    "name": "DeletePolls",
    "group": "polls",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "<p>Number</p> ",
            "optional": false,
            "field": "pollId",
            "description": "<p>Polls unique ID.</p> "
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n\"Poll deleted\"",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/api.js",
    "groupTitle": "polls"
  },
  {
    "type": "GET",
    "url": "/polls/:pollId",
    "title": "",
    "name": "GetPoll",
    "group": "polls",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "<p>Number</p> ",
            "optional": false,
            "field": "pollId",
            "description": "<p>Polls unique ID.</p> "
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"title\": \"MyPoll\",\n  \"creationDate\": \"2015-11-01T13:01:11.204Z\",\n  \"state\": \"Open\",\n  \"questions\": [\n    {\n      \"title\": \"Q21\",\n      \"type\": \"easy\",\n      \"_id\": \"56364f9a39ac36fd72c74e5f\",\n      \"choices\": [\n        {\n          \"key\": \"R1\",\n          \"text\": \"Rep1\",\n          \"_id\": \"56364f9a39ac36fd72c74e60\"\n        }\n      ]\n    }\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>The id of the Poll was not found.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n\"Poll not found\"",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/api.js",
    "groupTitle": "polls"
  },
  {
    "type": "GET",
    "url": "/polls",
    "title": "",
    "name": "GetPolls",
    "group": "polls",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[{\n  \"_id\": \"51bb793aca2ab77a3200000d\",\n  \"title\": \"TestTest\",\n  \"creationDate\": \"2015-11-01T13:01:11.204Z\",\n  \"state\": \"Close\",\n  \"__v\": 1,\n  \"questions\": [\n    {\n      \"title\": \"Q21\",\n      \"type\": \"easy\",\n      \"_id\": \"56364f9a39ac36fd72c74e5f\",\n      \"choices\": [\n        {\n          \"key\": \"R1\",\n          \"text\": \"Rep1\",\n          \"_id\": \"56364f9a39ac36fd72c74e60\"\n        }\n      ]\n    }\n  ]\n},\n{\n  \"_id\": \"51c35e5ced18cb901d000001\",\n  \"title\": \"Test2\",\n  \"creationDate\": \"2015-04-29T12:54:59.000Z\",\n  \"state\": \"Close\",\n  \"__v\": 0,\n  \"questions\": [\n    {\n      \"title\": \"Q1\",\n      \"type\": \"Easy\",\n      \"_id\": \"56360d178b275b6b2519d17a\",\n      \"choices\": [\n        {\n          \"key\": \"R1\",\n          \"text\": \"La réponse 1.\",\n          \"_id\": \"56360d178b275b6b2519d17c\"\n        },\n        {\n          \"key\": \"R2\",\n          \"text\": \"La réponse 2.\",\n          \"_id\": \"56360d178b275b6b2519d17b\"\n        }\n      ]\n    }\n  ]\n}]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/api.js",
    "groupTitle": "polls"
  },
  {
    "type": "POST",
    "url": "/polls",
    "title": "",
    "name": "PostPolls",
    "group": "polls",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 Created",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/api.js",
    "groupTitle": "polls"
  },
  {
    "type": "PUT",
    "url": "/polls/:pollId",
    "title": "",
    "name": "PutPolls",
    "group": "polls",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "<p>Number</p> ",
            "optional": false,
            "field": "pollId",
            "description": "<p>Polls unique ID.</p> "
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n\"Poll updated\"",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/api.js",
    "groupTitle": "polls"
  }
] });