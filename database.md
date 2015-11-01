---
layout: page
title: Database Conception
---

Our database currently consists of two collections. We might modify them or add new ones as the application gets more feature-rich.

We will add a collection containing users when creating an account becomes mandatory.

## Polls

This collection contains the polls with their questions and possible choices. Because one of the most common request will be to get a particular poll, it is more convenient to be able to get the poll, its questions and choices in a single request. In the future it might prove necessary to move the choices to another collection if we are intersted in getting every choices to every question without needing to retieve the questions themeselves.

## Participations

This collection represents the answers that a user has chosen for a given poll. This will typically allow to find, for a given user, every poll he has answered.  
When users will be implemented, this collection is likely to receive changes to accomodate more features and interesting queries.
