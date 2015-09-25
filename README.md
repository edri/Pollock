
# Pollock

### Install

 - `npm install`

### Run

 - Run server `node bin/www`
 - Go to http://localhost:3000/

---

# TWEB Project Repository

Welcome to the home of the TWEB Project. This is where you will find information about the project (specifications, evaluation, etc.).

## How to use this repo

### What should we do with this repo?

One (and only one) person in every group should fork this repository. All group members should then clone the fork and use it as a shared code base repository.

### How do we keep our fork in sync with this repo?

From time to time, we will add content in the repo (update the README.md file, add directories and files, etc.). You will want to fetch these updates, following the standard "fetch upstream" technique. If you do not remember how it works (from the RES course), refer to this [documentation](https://help.github.com/articles/syncing-a-fork/).


## About the project

### Introduction

The goal of the project is to **develop a complete web application**, with a back-end server (implemented with node.js, express.js), a NoSQL database (MongoDB) and an interactive front-end (implemented AngularJS and Socket.IO). The goal is also to use a collection of tools to optimize your development workflow (grunt, heroku, test tools, etc.).

The theme for the project is "**interactive presentations**" and the goal is to develop an application which increases the participation of the audience in a classroom (or in any situation where a speaker presents material and wants to get feedback from people in the room).

You have probably heard about or even used systems, where **you see a question on the projection screen and you can use a device to vote** (such as your mobile phone or a web app). The results are then displayed in realtime to the audience. You can imagine that the questions can be prepared in advance (to save time) or created on the spot. You can also imagine that it would be interesting to consult the results of previous polls in a web app (history, statistics, etc.). You can also imagine that the presenter would like to set different parameters: are people allowed to vote more than once? are they allowed to change their mind and revote? can they vote anonymously?

As you can see, when you start to think about it, ideas about features come quite quickly. Designing a user interface (for the voter and for the presenter, before/during/after the session) for all of these features is not easy, if you want it to be simple, intuitive and efficient.

The goal of the project is for you to implement such a system. We will start with the foundations of the application (in this phase, the specifications will be provided with quite some details). After this initial phase, you will be in charge to define the specifications. You will be responsible for defining the concrete features that you want to implement, for designing the UI with mockups and finally for implementing the system.



### Part 1

In the first part of the project, you will work on two very different activities:

* **firstly**, you will **apply server-side technologies** presented during the lectures to build the foundations for the application. When this is complete, you will have a very simple web application deployed in the cloud (on heroku). The application will simply display a landing page (a web page showing a welcome message). The application will also expose a simple REST API, which can be used to create, read, update and delete data in a MongoDB database.

* **secondly**, you will **identify usage scenarios, specify features and create UI mockups** for the application (this will start with brainstorming sessions within the groups). Even if the application is simple, every group will probably have different ideas and very different approaches for designing the UI. A key objective will be to keep it simple and to put you in the shoes of the user to be critical about your design: is the UI really easy to understand and practical to use in a real-world scenario? You will also have to create a **product web site** to present your product ideas, features and make it attractive to potential users (*"Register for public beta..."*). The goal is to do what you would do if you were planning to create a startup based on this product idea.


The specifications are available [here](specifications/part1/).


### Part 2

In the second part of the project, you will proceed with the implementation of the product features. You will expand the project skeleton developed in part 1 and extend the REST API to address your requirements. You will also apply the client-side technologies (AngularJS, Socket.IO, etc.) to implement the user interface components of your application. Remember that you should develop an interface for the presenter (used before, during and after the presentation) and an interface for the audience (to join a poll and vote).

You will actually be in charge to write the specifications during part1, but we will provide you with guidelines and constraints. They are not available yet, but will be available
 [here](specifications/part2).


### Part 3

The third part of the project will be a new development iteration. Before starting part 3, you will be asked to specify which features you intend to develop and plan the related activities. During part 3, you will implement these features and make sure that you have a solid implementation at every release. You will also improve the marketing elements of your project (refine content in the product web site, add screenshots, why not create a video).

Again, some guidelines will later be published [here](specifications/part3).
