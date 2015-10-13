# API

This document explains how the RESTful API works.

**Status:** Draft, ~~Working~~, ~~Stable~~, ~~Frozen~~

## Examples

Here is a few usage examples.

### Polls

_TODO_

### Questions

```
GET /api/question/2
```

```json
{
	"id": 2
	"text": "When should we do the barbecue?",
	"choices": [
		{
			"key": 1
			"text": "Saturday"
		},
		{
			"key": 2
			"text": "Sunday"
		}
	]
}
```

### Participations

_TODO_
