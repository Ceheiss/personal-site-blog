---
title: Using forms in the Backend
date: "2020-02-25"
---

I've been recently reading an HTTP book written by [K. Scott Allen](https://odetocode.com/) (great book for beginners like me) and dwelling more with the backend, so I figured I should write something quickly on how to use forms in a backend application.

To say I'm a stranger to forms would be false, I've written them (like this cool [ninja form](https://codepen.io/ceheiss/pen/PxKXjo)) but never really thought about consuming the information that was sent, nor did the **action** or **method** attributes defined on top where meant anything. My focus was building them in a responsive way that looked good.

### The What

First question to address is what do we want to do. So a form is an interface we give to the client in order to provide us with some information. Is our job as developers to take the information provided by the client and do something meaningful (and hopefully expected) with it.

So what is our way of communication? The first thing that we define in the form element is the action, this provides information about **WHERE** to send the information once is submitted, because if we are gathering information chances are we want a place where we can retrieve it and do something with it.

The second thing we add is the method we want to use. This method is an HTTP method, because when the client submits the form it will send a HTTP request, and is kind of nice to have a way to tell our server **what is the purpose** of the request. A **GET** request will retrieve a resource (is the R in CRUD), a **POST** request will send data to the server (usually the data is parsed and saved to a database or something, but more on that later, the C in CRUD).

So when would I use GET and when POST? Glad you ask random internet human, here it goes.

## Using a form with GET

Here we have to think that GET is a "safe method", we are just retrieving some data, not destroying or creating anything. So when would I use this? Imagine we have an app that will display the ratings of a given movie, and for the user to search for that he has thee following form:

```html
<form action="/movies" method="GET">
  <input type="text" name="search" />
  <input type="submit" />
</form>
```

So in my backend I backend I can do this:

```javascript
app.get("/movies", (req, res) => {
  const movie = req.query.search
  const movieData = getMovieData(movie)
  res.render("showMovieData, { movieData }")
})
```

I receive a request that will look something like `blahblah/movies?search=toy+story`, so my server logic saves in variable the value of search ('search' is the name chosen for the input in the form), that is found in the query of the request object. Then I have a function (`getMovieData()`) that does some magic we don't really care about with the name of the movie, and returns an object with data saved as `movieData` and passed to the `showMovieData` page to display it (and redirects the user to that page).

Point to take home, is that we are just reading data, so a simple GET request is enough for that purpose.

## Using a form with POST

Post means we want to provide data to a server, a common case is to create a user for example, so let's so here is when we want to create a user:

```html
<form action="/users" method="POST">
  <label for="firstName">First Name</label>
  <input type="text" name="firstName" />
  <label for="lastName">Last Name</label>
  <input type="text" name="lastName" />
  <input type="submit" />
</form>
```

So in the service side I will have access through the body of the request to the input values (in the GET we access them through the url). So I have something like `firstName=Gandalf&lastName=TheGrey` in the body of the response. I can handle that:

```javascript
app.post("/users", (req, res) => {
  const { firstName, lastName } = req.body
  /*==== Some code that saves that to database  ====*/
  res.redirect("/somepage")
})
```

So above I receive the information, do something with it, and then redirect to another page so the user doesn't submit twice by refreshing by accident or something like that.

## Wrap Up

So there you go, the method you choose for your form will depend on the purpose _do you want to add data? retrieve it?_ and that will be reflected in how you write the server side application to handle that (is it a `req.query` or a `req.body`?).

Until the next one
