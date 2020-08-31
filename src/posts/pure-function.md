---
title: "Functional Programming 101. What is a Pure Function?"
date: "2019-12-19"
---

In the previous posts we have talked about how apps are data that is presented in a consumable and meaningful way, and how data should be kept **immutable** when possible. Obviously, if we are going to transform the data, we need a way to do it. That way is functions, but not any functions: pure functions.

**What is a pure function?** besides an apparently **pious piece of code**, a pure function is a... function that creates and returns a value based _only on the input parameters_ and causes no side effects. It means that inside my function body I shouldn't depend on outside variables that could later change, and that the code causes change outside itself.

![](https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Function_machine2.svg/1200px-Function_machine2.svg.png)

A good way to think about it, is to think it as a mathematical function like this: `f(x) = x^2` so `f` is the function name, `x` is the input and `x^2` is the output. So basically we **always** need to take an input, we **always** get and output, and if we provide _n_ times the same input (parameters in our case) to the function, we should **always** get the same result.

As **Kyle Simpson** explains, in **Functional Programming** we should embrace using functions as _functions_ in the mathematical sense. This might feel weird at the beginning (I know it was for me) because I used to think of functions as procedures, what is a procedure? Let Kyle drop the knowledge to you:

> "A procedure is an arbitrary collection of functionality. It may have inputs, it may not. It may have an output (return value), it may not".
> Kyle Simpson

Example time? Sure why not

### Pure Function:

```javascript
const mergeArrays = (array1, array2) => [...array1, ...array2]
```

So simple and beautiful it brings tears to my eyes.

Now, I will unfold for you one super, ultra, impure function I wrote some time ago. Here my public humiliation:

### Impure Function

```javascript
function getRandomQuote(res) {
  const times = iteration.value
  const arr = res.data.quotes
  cleanPrevious()
  for (let i = 0; i < times; i++) {
    const random = Math.floor(Math.random() * arr.length)
    const randomQuote = arr[random]
    addElement(randomQuote)
  }
}
```

Where to start? Thank the gods I took an argument, but if you see I don't have any return value, I'm leaving side effects (`cleanPrevious()` is affecting outside code, `addElement()` is adding things in the DOM) among other things. This is a perfect example of a function as a procedure as previously defined, I'm just collecting functionality and tying it together under `getRandomQuote` label.

Now, don't get me wrong. If you are going to do DOM operations, you obviously will affect code outside the function. The idea is to keep that at a minimum and under control.

![](https://alvinalexander.com/images/fp-book/pure-functions/1-Pure-Function-Equation.png)

### Learnings

I think is has been great to learn about pure functions while practicing TDD because one obvious thing you can tell is that pure functions are very easy to test. Imagine one test for `mergeArrays`:

```javascript
test("merges two arrays into one", () => {
  const returnedResult = mergeArrays([1, 2, 3], [4, 5, 6])
  const expectedResult = [1, 2, 3, 4, 5, 6]
  expect(returnedResult).toEqual(expectedResult)
})
```

But how about `getRandomQuote`? First I don't have a returned value, so how do I expect something? I won't even try.

Second lesson: Is much simple and mantainable. Although is not extrictly part of pure function, in Functional Programming (perhaps in programming in general(?)), functions are encouraged to have a single responsability, if you want to do something more complex... use them together. Also, because we should always have a return value, we can use that return value as the expect input for another function and so do function composition, or chain functions (but that is another topic, and its Friday).

Keep code immutable, and functions pure is a hard task for me, but I think is a fruitful pursuit. The benefits are clear, is just a matter of practicing, and have these designing ideas always present.
