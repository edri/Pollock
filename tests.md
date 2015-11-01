---
layout: page
title: Tests
---

This document explains how the tests work.

**Status:** Deprecated, ~~Draft~~, ~~Working~~, ~~Stable~~, ~~Frozen~~

## Requirements
If you want to load test data in the website, you need to install **api-copilot**.
You will also have to have mangodb installed.

## Start tests
To start the tests' scenario, start your server, move to the root directory of the project and type the "*api-copilot run testRestApi*" command.

## Tests explainations
This scenario first connect to the database and **clean it** (be careful). Then, it make some HTTP request to the server to test the behaviour :

POST four new poll, GET all polls, GET one poll, PUT a poll, DELETE a poll, POST three new participations, GET all participations, GET all participations of a poll, PUT a participation and DELETE a participation.

## Expected results
If everything worked fine, when you access the website you are going to see some stats :

3 polls have been created in total.

3 polls have been created in a week.

2 polls are still open.

