# API

This document explains how the RESTful API works.

**Status:** Draft, ~~Working~~, ~~Stable~~, ~~Frozen~~

## Polls

Request:

```http
GET /api/polls/3
```

Response:

_An array of [Questions](#questions)_

## Questions

### GET

Request:

```http
GET /api/questions/2
```

Response:

```http
Status: 200 (OK)
```

```json
{
	"id": 2,
	"text": "When should we do the barbecue?",
	"choices": [
		{
			"key": 1,
			"text": "Saturday"
		},
		{
			"key": 2,
			"text": "Sunday"
		}
	]
}
```

### POST

Request:

```http
POST /api/questions
```

Data:

```json
{
	"text": "When should we do the barbecue?",
	"choices": [
		{
			"key": 1,
			"text": "Saturday"
		},
		{
			"key": 2,
			"text": "Sunday"
		}
	]
}
```

Response:

```http
Status: 201 (Created)
Location: /api/question/{new_id}
```

### PUT

Request:

```http
PUT /api/questions/2
```

Data:

```json
{
	"text": "When should we do the barbecue?",
	"choices": [
		{
			"key": 1,
			"text": "Saturday"
		},
		{
			"key": 2,
			"text": "Sunday"
		}
	]
}
```

Response:

```http
Status: 200 (OK)
or
Status: 204 (No Content)
or
Status: 404 (Not Found)
```

### DELETE

Request:

```http
DELETE /api/questions/2
```

Response:

```http
Status: 200 (OK)
or
Status: 404 (Not Found)
```

### Participations

_TODO_

## References

_[Using HTTP Methods for RESTful Services](http://www.restapitutorial.com/lessons/httpmethods.html)_
