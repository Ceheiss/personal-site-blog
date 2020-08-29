---
title: Functional Programming 101. Immutable Data, Objects
date: "2019-12-17"
---

In an effort to write better code, I've been looking into Functional Programming in Javascript. Reader be warned, I'm, not talking about advance stuff (at least for me) like Monads, Functors, or Algebraic Data Types, but much simpler yet powerful practices that I think can favor my code quality, like **Immutable Data** and the use of **Pure Functions**. This blog post will focus in the first concept (specifically in objects), tomorrow arrays, and later about functions, and as I progress in my learnings I will write about other things I've been, much more timidly, exploring such as currying, partial application, and function composition.

## Immutable Data

An app is composed by data, and the great difference between raw data and an app, one may argue, is that the data is presented in a consumable way, and that we can interact with the data (do things like read, add, update, and remove elements). So in order to interact with our data, there must be something that keeps track and remembers all of the changes we do to our data... keeping state (if I want my football scoreboard to add 1 each time a team scores, I need to keep track of the current amount of goals the team has scored, that is state). By the same token, Functional Programming pushes for immutable data, that is, not changing data after is created. This is **pickle** so the first thing I will show is ways of **adding**, **updating**, and **removing** elements in objects, of course, in an immutable way.

![](https://m.media-amazon.com/images/M/MV5BMGIyYjNhOTUtM2UxNC00MjFlLTkwZGYtNDQ0MDhmNGNkYWNlXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_.jpg)
_keeping state and immutability is a pickle, just like Pickle Rick_

### Objects

When we save an object in a variable like this `const enchiladas = {description: 'awesome food', calories: 'quite a bit'}` and then I want another object with the same properties I might try this `const enchiladaCopy = enchiladas`. That will fail miserably, because what we save in the variable is a reference to the object in memory, so `enchiladaCopy` and `enchiladas` are pointing to the same place, they are just aliases, if I change one, the other is altered as well. What can I do? well, I could try this:

```javascript
const enchiladas = {
  description: "awesome food",
  calories: "quite a bit",
}
const enchiladaCopy = {
  description: enchiladas.description,
  calories: enchiladas.calories,
}
```

Works? Yes. Practical? Nope. What happens in the apocalyptic scenario where we have 40 properties? Chaos. That is why we have the nice **spread** operator, and we can do this:

```javascript
const enchiladas = {
  description: "awesome food",
  calories: "quite a bit",
}
const enchiladaCopy = {
  ...enchiladas,
}
```

![](https://i.pinimg.com/564x/15/98/b3/1598b3af4de315813d6072f93cf222a4.jpg)
_Galadriel is -almost- immutable. So should be your data_

### Add

Just like that, we unpack (or spread) all the properties of `enchiladas` in `enchiladaCopy`. So our first task, **adding** a new element to `enchiladas`, without mutating it, is as simple as:

```javascript
const newElementInEnchiladas = {
  ...enchiladas,
  country: "Mexico",
}
```

### Update

Now we added a new value without mutating the original object. Awesome, how about **updating**? Well, maybe 'quite a bit' of calories is not quite exact, so we can update it like this:

```javascript
const updatedCaloriesEnchiladas = {
  ...newElementInEnchiladas,
  calories: 700,
}
```

Basically, calories will overwrite the value that gets unpacked from `newElementEnchiladas` without altering the object. Nice.

### Delete

Aren't we missing something? Yes, to **delete**. This is how we do it.

```javascript
const { calories, ...noMoreCaloriesEnchiladas } = updatedCaloriesEnchiladas
```

Now you change your mind, and don't really want to count calories so just want to forget it. Above is a combination of techniques, the tag team of **Destructuring** and **Rest**. What we are doing is destructuring calories (extracting it as a variable) and all the rest of the properties left in `updatedCaloriesEnchiladas` are collected in `noMoreCaloriesEnchiladas`. **...** when is at the left of **=** is rest, and it does the opposite of spread, that is, it doesn't expand, but it collects. If you don't use destructuring it will copy all the properties, so if you have `const myPerson = {name: 'Earl', age: 45}` you could do either `const {...newPerson} = myPerson` or `const newPerson = {...myPerson}` with the same result.

So that is basically it (since reading data doesn't alter anything). Tomorrow I continue with arrays (that should be very straightforward), and maybe I will clarify as a bonus some things regarding **destructuring**, **rest**, and **spread** since are a bit tricky (at least in my experience).
