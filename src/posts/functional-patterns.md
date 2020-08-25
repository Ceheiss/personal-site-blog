---
title: "Functional Programming 101. Basic Design Pattern"
date: "2019-12-30"
---

Having a structured way off organizing my apps has always been a struggle. I guess I had an intuition of separation of concerns, but at the end of the day it was all very messy, state was kept in different functions, there wasn't a sistematic approach for DOM manipulation and so on. Anyhow, I want to share a way of organizing an app I learned recently in my Functional Programming course. I will start by giving an overview as I understand it, will share the code of a super exciting... counter app (as basic as it gets) shown in the course, and walk through each part. Let's get to it.

![](https://image.stern.de/8693024/16x9-940-529/e4b754418b93c911dd9465cdc138bc66/yQ/lionel-messi-lobeshymnen-champions-barca-liverpool.jpg)
_I said messy, not Messi_

I know I've said this multiple times already, but here it goes again: an app is composed of data and (hopefully pure) functions we use to interact with that data. When we are thinking of an app (_per_ this pattern), we should start by thinking in three things:

1. Our **data model** (what information we want to keep track of, and how are we going to represent it).
2. Our **view functions** (how we go from raw data to the information rendered on the website)
3. Our **update functions** (how we update the state according to the interactions done in the web interface).

In order to make the explanation more concrete and easy to follow, I will show the code for the counter app (not my original code) and later I will proceed to explain how the app is wired app and why is this, in my opinion, a desirable approach.

```javascript
import hh from "hyperscript-helpers"
import { h, diff, patch } from "virtual-dom"
import createElement from "virtual-dom/create-element"

const { div, button } = hh(h)

const initModel = 0

function view(dispatch, model) {
  return div([
    div({ className: "mv2" }, `Count: ${model}`),
    button(
      { className: "pv1 ph2 mr2", onclick: () => dispatch(MSGS.ADD) },
      "+"
    ),
    button(
      { className: "pv1 ph2", onclick: () => dispatch(MSGS.SUBTRACT) },
      "-"
    ),
  ])
}

const MSGS = {
  ADD: "ADD",
  SUBTRACT: "SUBTRACT",
}

function update(msg, model) {
  switch (msg) {
    case MSGS.ADD:
      return model + 1
    case MSGS.SUBTRACT:
      return model - 1
    default:
      return model
  }
}

// impure code below

function app(initModel, update, view, node) {
  let model = initModel
  let currentView = view(dispatch, model)
  let rootNode = createElement(currentView)
  node.appendChild(rootNode)
  function dispatch(msg) {
    model = update(msg, model)
    const updatedView = view(dispatch, model)
    const patches = diff(currentView, updatedView)
    rootNode = patch(rootNode, patches)
    currentView = updatedView
  }
}

const rootNode = document.getElementById("app")

app(initModel, update, view, rootNode)
```

First we start with our data model. In this case, a counter app, that is quite easy: a **number** (often will be an object with different properties). We store the initial model on the `initModel` variable and set it up to `0`. Let's talk about the view.

As we learned before, a pure function always has to take arguments and return a value. In the case of the `view` function we tackle two arguments: `dispatch` and `model`, I will talk about `dispatch` later. So what is going on? We are returning a bunch of different **HTML elements** and we know what _changing values_ to display based on the model. In this case we are using the _hyperscript_ library to make the templating easier (but is not fundamental for the design pattern I'm trying to talk about, so I'll leave it at that). The other important thing is that we are returning some buttons that have a `onclick` event listener, each button triggers a callback called `dispatch` with different messages (`ADD`, or `SUBTRACT`) as arguments. So that leads us to update (I know this might be confusing, but everything will be explained!).

Finally, our update function takes the model and a message as parameters. It works in a very straightforward way: it uses a `switch` statement to check which operations to do to the `model`. If the message is `ADD` it adds one, if it's `SUBTRACT` it... substracts one. The return value is the updated `model`.

OK, OK, OK, but how all of this actually work together? Glad that you asked. Is in the `app` function. App is very important is the glue that connects everything, and it works like this: When we call it with all the arguments `app(initModel, update, view, node)` the first thing that `app` does is declaring the `model` with the current data (`initModel`), with the `model` in hand it passes it as an argument to the `view` function (alongside the `dispatch` function) and saves the return value as the `currentView`. In this case we are using a library for virtual DOM, but the idea is that we finally assign the current view (all of those generated HTML elements made with `hyperscript`) to a div element (our root node) we created in the html file.

Everything nice and good, but how do we actually render the changes we make in our app? We use the `dispatch` function for that. So the `dispatch` function is defined inside `app` and it takes a message as a parameter. Since we pass this function to `view` (`dispatch` function that is), we can call it in it. So when we press the `+` or `-` button (that are defined inside the `view` function), we are calling `dispatch` with either the message `ADD` or `SUBTRACT`. `dispatch` will then redefine the `model` by calling update like this: `model = update(msg, model)`. As we remember, `update` returns an updated model with the modifications specified via the message.

Now that we have the new model, what comes next? We create an updated view that gets finally passed to the root node, and hence rendered in the screen. Since we are using a virtual DOM library, `const patches = diff(currentView, updatedView);` will do some efficient **voodoo magic** to only render whatever changed between `currentView` and `updatedView` without doing the costly effort of re-rendering everything.

### Take aways

This was a super specific blog post, but if you survived it, I hope you learned as much as I did writing it. Now, what I like about this approach is that all of the side effects and state is in just one place: the app function. So as I stated before and has been a tonic in this course, side effects are inevitable, but we should always strive for tightly control them.

I like the way is very clear with the `update` functions via messages, all the possible interactions we can fire in the app. In general, I think that this pattern make the app scalable, having a clear way of organizing the code would make adding features (a button that multiplies the number ny itself for instance) much more straightforward. I will try to apply this model to an app of my own, so I can put it in practice.
