---
title: Reading Source Code
date: "2019-11-06"
---

Writing a working solution to a problem using code is one thing, but being able to read someone else's code is a different ballgame. When we write a program, the code that we created -and hopefully commented- is a reflection of our thinking process while trying to solve an specific task.

The thing is, for every person that tackles a problem you can find the same amount of solutions... totally different inputs with similar outputs. Since most of time we are reading and working on top of the code written by another person, it's imperative that we get used to the uncomfortable feeling of taking a deep dive in the thinking process of a fellow coder (or a group of people for that matter), and do our best to understand how they approached the problem and why the took the decisions they did.

In that regard, is that I’m devoting time everyday to read open source code, to force myself into an unfamiliar subject. Currently I’m working with Accounting JS (repo [here](https://github.com/openexchangerates/accounting.js/)), partly because it was recommended per a curriculum as a not overly simple but not overly complex source code with no dependencies (so you focus on core logic) that also has an abordable size (around 400 lines).

My approach to understand this code base has been first to get a generic look, then play a bit with the app and what is supposed to do (thankfully they have this nice [demo](http://openexchangerates.github.io/accounting.js/)), I read the tests both as means to get ideas on how to write better tests, and also as good source of info regarding what should the methods do and what are the expected outputs. Finally, I used Chrome's debugger to track how a number is formatted into ‘money notation’, following closely which methods call what and how the process is run.

There is still a lot to learn from this repo, but beyond what each method does (that would be of very little interest I assume to a reader) I will point out some patterns I’ve noticed as well as practices.

### Findings

- The whole library is wrapped in a IIFE. It exposes its content by taking root as an argument and passing 'this' when calling the function. That is a good idea in terms that the global object can be window or global if run in Node, so I thought it useful not hard coded as window.

* Methods are separated in two main sections, one is for helper methods, as I understand them, are useful tools to make operations but their content is not fundamental to the library (just instrumental). The second group is the API specific methods (unformat a string, formatMoney a number, etc.).

- Within API Methods we see some methods whose functionality is crucial for many other larger methods to work. Other methods are a big compound of sub methods and perform a very expressive and tangible task (like returning a fully formatted string **\$23,223.00** from **2322300**).

* There are plenty of polyfills in case some methods are not available (like map or filter). I think that can prevent a lot of broken code.

- Sometimes you don’t need to get a whole dependency if you are going to use a couple of functions. In the code base they have some underscore methods, but instead of having underscore as a dependency, they copy the specific methods and acknowledge where the code comes from in the comments.

* There is a nice "or pattern" to prevent the code from crushing if a function doesn’t receive an argument is expecting:

```javascript
function propertyChecker(object) {
  let obj = object || {}
  return obj.hasOwnProperty(whatever)
}
```

- in this case if `propertyChecker` isn't passed an object, it would be `undefined`. Since `undefined` is a primitive, it doesn’t have `.hasOwnProperty()` as a method, therefore our code crushes. The `||` enables us to set `obj` as either `object` (if it passed in the best case) or if that returns falsy it defaults as an empty object `{}`.
  This pattern is used a lot throughout the code.

* Regex is used a lot when formatting an input into something the code can handle. Feels like a good idea to always curate as much as possible if dealing with inputs from the user.
