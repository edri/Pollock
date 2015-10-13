# API

This document explains how the RESTful API works.

**Status:** Draft, ~~Working~~, ~~Stable~~, ~~Frozen~~

## Examples

Here is a few usage examples.

### Polls

_TODO_

### Questions

Request:

```http
GET /api/questions
```

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

### Participations

_TODO_
