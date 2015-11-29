
# Pollock

### Install

 - `npm install`

### Run

 - Run server with `npm start`.
 - Go to http://localhost:3000/.

### Watch Sass and TypeScript

 - First install **gulp** if you want to watch and automatically update Sass and TypeScript project's files.
 - Run the `gulp` command into the root directory of the project.

### Add a new view

If you want to add a new view to the project, there are several steps. You have to know that views are grouped by components.
- First of all, create your new Jade view in the "*/server/view/components/*" directory.
- Once done, create a new folder containing the TypeScript file related to your new view in the "*/client/components/*" directory. In this file, you'll have to set the view's selector and template's URL (indicating where in the Jade file), write a directive for the application's router and export the view's class. You can help yourself by building the file on what already exists.
- Then, register your new view in the application's bootstrap file ("*/client/bootstrap.ts*") under the **@RouteConfig** annotation. Don't forget to import your new view's class in the header!
- Finally, you also have to link your view with the Express' router, by adding a clause on the "*/server/routes/components.js*" file. You will be able to use it if you want to communicate with the database, for example.

---

# Documentation
You can find the Heroku apps here : https://pollockweb.herokuapp.com/ ; you can find our product page here : http://edri.github.io/Pollock/.