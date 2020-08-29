---
title: Refactoring and adding new features
date: "2019-11-25"
---

![](../images/book-proofreading.jpg)
_looks like this, but with more bits and less ink_

The theme for the week, as decided with my fellow apprentice Preetham was on the topic of **refactoring**. What is refactoring? As a short and sweet answer I would say that is changing and improving working code, but _without changing external behavior_. Refactoring is not about adding features, is the inner wirings of the code.

This is a multi-layered problem as you might imagine. There are several things to consider, but we started for the most simple one: learn your tools (mainly, your IDE). When refactoring, one might suppose a lot of text editing. You might want a nice and efficient way on renaming a variable (respecting scope), or you might want a shortcut to transform a ES5 function declaration into a it's more fashionable version, an arrow function. There are several things to do, all involve working with already existing code. So this was a first step. Although `efficient code editing !== refactoring` it is the match that helps to lit the candle.

We talked with Preetham about snippets, keyboard shortcuts, and build our own cheat sheets with that information. I feel kind of stupid now, understanding all I can do in _VSCode_, when I just used it as colorized notepad (well not really, but I didn't go deep in it anyway). With that information it was time to practice a bit.

### Refactoring and adding features

I started by pasting old ES5 code I have wrote before, and practice more mechanical things, like targeting several `var` declarations at once, renaming variable names several times using keyboard shortcuts, transforming ES5 into arrow functions, and string concatenations into template literals.

After that, I decided to go back to my [node todo app](https://github.com/Ceheiss/node-todo-app) and refactor it's content with the suggestions my mentor Dejan gave me. The code changed importantly, because before I was mutating data, and the returned value was an array, when now is a Promise (and you now how much I `!`like promises. But well, keep your friends close, and your enemies closer). This is an example:

```javascript
const createTodo = (newTodo, state) => {
  if (typeof newTodo !== "string" || newTodo === "") {
    return Promise.reject("Please enter a todo")
  }
  let returnedArray = state.slice(0)
  returnedArray.push({ todo: newTodo, completed: false })
  return Promise.resolve(returnedArray)
}

module.exports = createTodo
```

Since I returned a Promise, my testing also had to change:

```javascript
test("it should add a todo", async () => {
  let todos = []
  let todosWithNewItem = await createTodo("new todo", todos)
  expect(todosWithNewItem.length).toBe(1)
})
```

As you see above, I have to declare the function to be `async` in order to call `createTodo()` using `await`. What happens if I neglect `await`? Well, all hell breaks loose, meaning that `expect` is going to run the code with `todosWithNewItem` as a param, but `todosWithNewItem` most likely has no value yet because `createTodo` is an asynchronous function. Asynchronous code still baffles me, but I think that spending time with it has helped me tons in understanding it better.

After I finished with all of my CRUD operations and went from the terrible red to the 'oh so sweet' green. It was time for features.

![](https://automationpanda.files.wordpress.com/2017/10/new-feature.png)

#### Adding a feature

So as stated before, everything I did before was refactoring. Yes, my code got way better, less mutations, and handles errors... but to the user is still the same app. I decided to add a small feature, the possibility of toggling a todo between being completed or not.

To do this, I decided to practice some `git` as well, so created a branch called `new-features` and bowed solemnly not to merge it to master until it works well (I always just worked in master, because I did it alone, now I see the tremendous benefit).

In order to have this work, I had to change the structure of how I was storing data. Before it was like this:

```json
[
  {
    "todos": ["sample todo one"]
  }
]
```

Now like this:

```json
[
  {
    "todos": [
      {
        "todo": "sample todo one",
        "completed": true
      }
    ]
  }
]
```

As you might know, this meant that I have to rewrite how I was accessing the data (although it was pretty straight forward). I was able to add the new feature and have it to work fine (passes the tests at least), so I decided to merge with master (that was a first) and push it. Nice, I got some refactoring, git practice, and feature adding all in one go. I need a burger. Oh, yes, checkout my repo [here](https://github.com/Ceheiss/node-todo-app) (and see the commits to look at the evolution of the code).
