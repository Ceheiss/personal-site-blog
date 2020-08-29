---
title: Node, Event Emitter, and Inheritance
date: "2019-11-04"
---

My understanding of Javascript, and my interactions with the language, have come mostly from a browser perspective. That is true to the point that when I did my Tic Tac Toe game, I decided to keep state (which board cells are marked by who) by assigning css classes to each element via the DOM. I think I need to get used to JS in other scenarios, and hence my approach to get a better understanding of Node.

So far I've come accross interesting findings, like how when we create a module,Node wraps our code inside something similar to an IIFE. The only thing that gets exposed is whatever value is passed to module.exports (I learned with the old school syntax, but principles remain I believe), module.exports is the value being returned when we call the require function in a different file. Having our code wrapped in a function creates a execution context, so we only expose what we want, enabling us to have multiple modules used in a project without a lot of risk of having collisions in names.

### Event Emitter

I've used events in DOM plenty of times, you take a DOM element, add an event listener that describes what should de element be 'listening' for (is it a click? Hover?) and a callback that indicates what to be executed when that event happens. I learned a bit about Node Event Emitter.

There are some events that we might need to handle in Node (trigger something when opening a file, when getting information from the internet, etc), but Javascript doesn't have a native way to handle that (`addEventListener` is part of the browser, as all DOM manipulation).

When I want my object to respond to an event with something, I can use `object.on()` and `object.emit()`. But how do we give these functions to the objects? I found this to be very interesting.

So there is a Node module where all the code for Event Emitters is written, we need to require that. In that code there is a class that defines this properties, so we need to create a class that extends from it, so when we create an object it will inherit these methods.

### How JS Classes Work

I've heard constantly that the ES6 way of handling Prototypal Inheritance via classes is just syntanctical sugar (just write in a different, more simpler way, but have same results as before), and that really good old constructors are behind the scenes.

So basically what is going on when we do extends on another class is something like this:

```javascript
let Person = function (name) {
  this.name = name
  this.greet = function () {
    console.log(`Hello ${this.name}`)
  }
}

let Police = function (name, badge) {
  Persona.call(this)
  this.name = name
  this.badge = badge
  this.policeGreet = function () {
    console.log(`Hello, I'm ${this.name}, and my badge number is ${this.badge}`)
  }
}
let carla = new Police("Carla", 55535)
// carla has access to greet and policeGreet
```

When we do extends and then call `super ()` in the constructor, what is going on is that you are calling a different constructor in your constructor (so we call the Persona constructor inside the Police constructor), and since `this` inside a constructor points to the new object created, we pass `this` as the argument to the Persona constructor, therefore accessing those methods and properties when we instantiate the object.

Doing this, when I create `carla`, I have access to `greet()` and `policeGreet()`. Same dinamic with Event Emitters, If I extend the event emitter class to my class, each object I build that way will inherit the methods from it's prototype via prototypal chain, and therefore will be able to use `.on()` and `.emit()`
