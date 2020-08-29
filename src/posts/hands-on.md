---
title: Hands On
date: "2019-10-18"
---

After the daily meeting, it was time for a little wax on wax off action in Javascript fashion, so I did ["ES6 Katas"]("https://jskatas.org"). Dejan, Wolfram (two of my mentors), and I went over the concept of Destructuring, specifically how it’s applied in objects.

The way ‘destructuring’ works is pretty cool. As its name implies, it allows you to unpack values present in an object, array (technically an object, but destructuring works differently with them), and string. Since I worked mostly with objects I will focus on that.

So first, a tool doesn’t make sense if we don’t have a problem. Imagine you want to save the value of some properties in an object in independent variables. Let us use pikachu as an example:

```javascript
let pikachu = { type: "electric", species: "pokemon" }
```

#### I would have done:

```javascript
let type = pikachu.type
let species = pikachu.species
```

#### But with destructuring I can do:

```javascript
let { type, species } = pikachu
```

Doesn’t look like much, but imagine a dozen properties (I don’t want to clutter the space, but you get the idea).

The syntax is very straight forward, basically you write the properties you want to extract, and wrap them with curly braces (since this is object destructuring, in array you would wrap them in brackets, and reference the properties by position, not name).

I’m sure there are plenty of interesting applications that I’m not seeing yet, but learning the syntax, and playing around with it, is a nice first step.

### Functional Bug-Hunt

After katas I talked with Dejan regarding Functional Programming, time organization, and some resources for both. We talked about languages like LISP that can force you to think in a different way (functional one), and how exposing yourself to that can later influence the way you write JS.

I don't know much about Functional Programming just yet (besides the intend of immutable data, and some other bits), but I'm sure that diving into it will help me harnessing the power functions, as "first-class citizens", have in JS.

In the afternoon I practiced some TDD by ['replicating the indexOf array method']("https://github.com/Ceheiss/testing-tests"). I also had a remote debugging session with Ewa, where we hunted down the bug after a good while of chasing it with the Chrome Debugger. It was quite fun actually, and interesting in terms of trying to catch a bug in a code you are just being exposed to.

Quite nice day, and that is how this week ends, and the weekend starts.
