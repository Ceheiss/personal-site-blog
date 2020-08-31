---
title: Putting the pieces together
date: "2020-02-26"
---

Hello everyone, if you have been following some posts you might know that I've been learning about how to build small services in Express, as well as learning a bit of React. So this blog post is about a small toy app I built combining both let's get to it.

I've been reading a book about React but I felt I needed to build something from scratch, something simple so I can get a feel for the library, but not trivial, so I decided to go for a random quote generator. Random quote would allow me to have some events (like clicking), keeping state, passing props, and even the opportunity to fetch some API for the information. Cool.

So I was about to do it, and thought that instead of using some API like [the Star Wars one](https://swapi.co/), I could write it on my own. And so I did in Express, and it looks a bit like this:

```javascript
app.get("/api/quote", (req, res) => {
  res.json(pickRandomQuote(lotrQuotes))
})

app.get("/images/:picture", (req, res) => {
  const image = req.params.picture.toLowerCase()
  res.sendFile(`${__dirname}/public/images/${image}`)
})
```

A sample of what you get when you hit the endpoint `/api/quote` is this (this is the endpoint [http://lotr-random-quote-api.herokuapp.com/api/quote](http://lotr-random-quote-api.herokuapp.com/api/quote)) you can look here:

```json
{
  "quote": "Torment in the dark was the danger that I feared, and it did not hold me back.",
  "author": "Gimli",
  "image": "https://lotr-random-quote-api.herokuapp.com/images/gimli.jpg"
}
```

So basically I built a function that retrieves a random quote object with a quote, author of said quote, and an image of the author. The function takes care of the randomness (or pseudo randomness for that matter), so the user gets _almost everytime_ something different when making a request to that url. The pictures, as seen on `/images/:picture` are sent as static files. The code is [here](https://github.com/Ceheiss/lotr-random-quote-api) in case you are curious about something else.

So cool, we have an API, now time to consume it.

![](https://i.kym-cdn.com/entries/icons/mobile/000/028/021/work.jpg)

## React

In React I made a request a fetch request to my API like this:

```javascript
onClickHandler = () => {
  fetch("https://lotr-random-quote-api.herokuapp.com/api/quote")
    .then(response => response.json())
    .then(data => data)
    .then(data => {
      const { author, quote, image } = data
      console.log(data)
      this.setState({
        author,
        quote,
        image,
      })
    })
    .catch(error => console.error(error))
}
```

and then the App component looked like this:

```jsx
render() {
  return (
    <div className="App">
      <LotrHeader />
      <DisplayQuote
        author={this.state.author}
        quote={this.state.quote}
        imageUrl={this.state.image}
      />
      <Button clickHandler={this.onClickHandler} />
    </div>
  );
}
```

Cool everything ready, so I deployed to Heroku here [https://lotr-random-quote.herokuapp.com/](https://lotr-random-quote.herokuapp.com/) and tried and... it failed. Crap. So what was wrong? Well, after a lot of looking, and head banging (remember I'm a backend noob) I was managed to address the problem. So basically it was a CORS (Cross-Origin Resource Sharing) issue. Since I wanted my API to be independent (not part of the React app, but capable of being used by anyone), it is it's own independent project, so basically when getting a request from my React app, my server freaked out and didn't share his information. I had to go back to my server and add a little something.

## Cors and DDoS

I added the `cors` package and then with this middleware `app.use(cors({optionSuccessStatus: 200}));` made my API available for the public for requests. Yahoo, itt works! Great, that is it right? That is what I thought, I showed this to Gabriel, one of my mentors, and he told me that is preferable to set specifically from which hosts will my server respond (so I could add my React app as safe, and be done). But that was also a problem, that the reason I did this independently to begin with, is so other people can also use the API for something (_maybe learn how to use Fetch with a simple, keyless, and friendly API?_). "You are open to DoS attack he said", so I had to think about something else.

So a **DDoS (Denial of Service)** is basically an attack that overflows a server with requests to the point that it can not handle real ones. So I looked in the web and finally added this module `const rateLimit = require("express-rate-limit");` and use it as recommended in the docs:

```javascript
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
})
app.use(limiter)
```

So if an IP is making a bunch of requests, it handles it. Granted, is not ultra secure, but in all honesty if a hacker even acknowledges my little API, I would take that as a compliment.

This make not look like a lot, but I learned TONS building this. Know I will apply some learned CSS to make it responsive. But that is for later.
