---
title: "Learning by induction - The Learnings"
date: "2020-02-11"
---

In the previous blog post I talked about how using two different templating engines (EJS and Handlebars), helped me to understand better what is the role of templating engine (as opposed to have searched a Medium article like _"What does a templating engine do"_, which is totally valid, but a different approach). I learned that they help you to inject JS (and you can pass some values from the route to the template), you can do some logic (that will depend on each templating engine), and that they have support to incorporate partials.

![](https://i.pinimg.com/originals/75/da/2b/75da2b41cff15d60fddc0f5bb31b9923.jpg)

This also striked me when I tried to learn how React works with [this tutorial](https://pomb.us/build-your-own-react/) by Rodrigo Pombo and looked what JSX did for me. So When I write something like `const element = <h1 title="foo">Hello</h1>` what I had was actually this:

```javascript
const element = React.createElement("h1", { title: "foo" }, "Hello")
```

So the 'createElement' method takes three arguments, the first one defining the type of the element to create, the second one is an object that contains all the properties to be passed to the element to create, and the last parameter is either the content (in reality looks like the following, but let's keep it simple for the sake of the argument):

```javascript
const element = {
  type: "h1",
  props: {
    title: "foo",
    children: "Hello",
  },
}
```

Now, I've used Hyperscript before, and when used in conjunction with Hyperscript Helpers, you get a big object that holds several HTML element types (like div, h1, input, button, etc). How do you use it? Like this:

```javascript
const { h1 } = hh(h)
const element = h1({ title: "foo" }, "Hello")
```

h1 is the method (extracted from the main object), and I pass to it two parameters, the first being an object with the properties to the new h1 element, and the second is the content. Looks similar right?

Now how about nesting? in JSX we can do something like:

```
const nestedElement =
 <div>
   <h1 onClick={() =>console.log("element was clicked!")}>
     I'm Nested
   </h1>
 </div>
```

Same can be done in hyperscript:

```javascript
const { h1, div } = hh(h);
const nestedElement =
  div({},
    [
      h1({ onclick={() => console.log("element was clicked!") },
       "Hello")
    ]
  );
```

We can provide an array as the second argument and enter as many child elements as we want, and if we want those child elements to have children as well we can do it. Basically we can compose this and generate a whole template from a single method call from a parent element. Then we can inject the JS this method returns into one lonely DOM element as the entry point for our app... wait, isn't that how what React does as well? Damn.

### Learnings

So, I know this is an oversimplification of React, in all honesty I don't know much of it since I'm just starting to learn it, but having used something like Hyperscript before as helped me to better assess the dependencies I need. If we want a nice way of generating DOM elements and having the ability to do so in a nested manner so we can inject a single value into a DOM element, then React is not the only alternative. Maybe if I want more complex elements that handle State, I want to use the built in virtual DOM instead of using another package for it (and a million other reasons I don't even know I don't know), then React is the way.

Final point is, and going back to _learning by induction_ theme, that by exploring different alternatives to do same-ish thing, you can get powerful insights of what a technology does for you, and what these "type" of technologies try to solve. With that info is easier to determine whether to use them or not, and not to freak out if you have to have another one.

Are we using Handlebars or EJS as Templating Engine? No. Well, whatever we use will likely have a syntax to inject JS, do some logic, and incorporate partials, so no big deal. Are we using Hyperscript? React? No, we are using Vue.js. Cool, don't know nothing about it, but I can get a sense of what Vue.js will do for me. Learning, by induction.
