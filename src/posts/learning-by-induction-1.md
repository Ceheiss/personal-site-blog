---
title: "Learning by induction"
date: "2020-02-07"
---

**WARNING** _My blog was having some **interesting** behaviors with the templating code examples, so I added extra spaces in some parts to bypass them (so not everything is working syntax)_

Imagine you are an early scientist and you manage to get to an island nobody has ever seen. While there, you get exposed to this strange animals you haven't seen before, you see an eagle roaming high, you see a hummingbird next to a flower, some seagulls cracking shells in the coast, and an occasional pidgeon moving from tree to tree. All of these creatures are certainly not equal, but they certainly look different to the animals you have at home, you can extract some common patterns enough to make a category. The all have beaks, feathers, wings, and lay eggs. You call them birds.

![](https://cmkt-image-prd.freetls.fastly.net/0.1.0/ps/3681009/910/606/m2/fpnw/wm0/pd13-eye-top-birds-1-l-.jpg?1512373145&s=432a65f12d3f141ec7467e79a5da7f87)

That is inductive reasoning, out of specific cases we extract a general principle (open to be modified). _Just as a side note, this is opposed to a statement like "Every single man is not married", where, if a man is married he is not single by definition, we don't have to explore the world to see if there is a case of a married man that is single, we know is not possible via definition (just like a triangle with eight sides). OK, enough of that, moving on_.

You might be thinking, why are we talking about birds? Why are talking about induction? Is because I think there is some value from this approach to learn different things, in my case for example, was about templating engines. I'm currently diving into the backend (NodeJS), I learned how to route to different static files and that is cool, but how about using dynamic information? If I want to display the name of the user that logged in my page, how do I do that? I went with EJS.

So I set `app.set("view engine", "ejs");` up in my `app.js` file. Then imagine I have a simple route:

```javascript
app.get("/subsection/:name", function (req, res) {
  const sectionName = req.params.name
  res.render("section.ejs", { sectionName })
})
```

So now for some strange reason I want to print five times the name of the section on `section.ejs`. Oh, and I also have some nice header and footer I want to include (as I do in all of my pages) and I end up with this:

```
< %- include("partials/header") % >
<h1>Welcome to...:</h1>
< % for(let i=0); i < 5; i++ { % >
 <h2> <% = sectionName %> </h2>
< % } % >
< %- include("partials/footer") % >
```

But is **EJS**, the only way of doing this? Is it a must in a Node? Sometimes when you only use one tool you might subconsciously thinking of it as mandatory, so let's experiment with **HBS**, the Express templating engine for **Handlebars**.

We set it like this: `app.set("view engine", "hbs");`. My route to the sections looks like this:

```javascript
app.get("/subsection/:name", function (req, res) {
  const sectionName = req.params.name
  res.render("section.hbs", { sectionName })
})
```

and my file would look like this:

```
{ {>header} }
<h1>Welcome to...:</h1>
{ {#repeater} }
<h2>{ {sectionName} }</h2>
{ {/repeater} }
{ {>footer} }
```

So now, just like the birds, we start looking at some patterns. In templating we are given ways to inject JS into our HTML, so if we want to greet a user, but the name of the user will change, we can do `<h1> Hello < %= username % > </h1>` or `<h1> Hello { {username} }</h1>`, so we know templating engines will provide us with a way of doing that (birds have a beak). We noticed that repeating some elements like headers and footers might be desirable, and that can be done in EJS like `< %- include("partials/header") % >` and in Handlebars like `{ {>header} }`, different ways, same outcome (birds have feathers).

![](https://danielmiessler.com/images/Screen-Shot-2019-11-12-at-9.38.00-PM.png)

Lastly we see that we might be able to add some logic. To do this, in EJS we use:

```
< % names.forEach(name => { % >
 Hello my name is < %= name % >
< % }); % >
```

with this we can do for loops, functions, if statements and other things. In Handlebars changes a bit, you have this thing called 'helpers':

```
{ {#each names} }
Hello my name is { {name} }
{ {/each} }
```

Each is a default helper, and you have that come in the toolbox like `each` and `if`, but if you want something different, you will have to custom your own helper before using it. So here we see a difference with EJS, but at the end of the day, both engines have a way of adding some logic to the template.

So, I wanted to talk a little bit more, but this post is to big (if you made it this far, good on you!), so I will write a part two talking about a small example concerning JSX and Hyperscript, and then finish of with some learnings. Until next time!
