# workout-app
The UI to handle CRUD operations for workout plans with the [API](https://github.com/DenisMaley/workout-api)

# Installation
For this project you have to install the [API](https://github.com/DenisMaley/workout-api) first.

- Clone the repository to the /Applications/MAMP/htdocs
- Go to `workout-app` directory
- Run `npm install`

The App should be available [here](http://localhost:8888/workout-app/).

# Ideology
As a test assignment it was done very simple. 
There is no any framework, and there is only one page

There is no functionality to change days in workout plan - it should be the next step.

And then the next step - to implement changing days with [sortable.js](https://github.com/SortableJS/Sortable): like [this](https://sortablejs.github.io/Sortable/#sorting-disabled)

# Functionality

With this API you are able to:
- Create
- Load
- Edit
- Delete
workout plans and users.

A plan has a name and consists of several (workout) days.
A day can have multiple exercises that you should perform that day.
A plan can be assigned to one or more user(s).
An user is an entity with personal data (firstname, lastname, email)

Whenever a plan is modified, the user(s) connected should be notified of the change by mail.
