---
title: "Deep Copying Arrays"
date: "2020-02-16"
---

![](https://cdn.lynda.com/course/751323/751323-636854833232575341-16x9.jpg)

I was working on [this coding challenge](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/javascript-algorithms-and-data-structures-projects/cash-register) by the great humans of [Free Code Camp](https://www.freecodecamp.org/) and I stumbled into some trouble. The challenge required to work with a 2-D array, I was writing a helper function to do some operations to the array and to my surprise I was sometimes getting correct results and other times some... very interesting results.

But why? A pure function should always return the same output given the same inputs, right? ...right? Well, I figured something was altering the mock array I created to test my code. But how can that be? The first thing I did was destructure the input into a new variable so I don't mess with the original array. I run the code in the debugger and notice that the array was mutating regardless... crap.

OK, so what else? I abandoned **[ ...thisApproach ]** to try **thisApproach.slice()** same result... array was being mutated. Then, like a brick in the head, I understood. This is a 2-D array, so although I'm making a copy of the array, the reference to the values in the inner arrays are not being copied. I googled whether destructuring or slice did shallow or deep copies and they don't, so cool, I know what I have to do.

Turns out, there isn't a native **"deepCopyArray"** so I looked for solutions. People recommended using a library like **Lodash** for this, but adding a whole library for a single method seemed like overkill, so I looked elsewhere. First I found this one, hacky but interesting:

```javascript
const newArray = JSON.parse(JSON.stringify(nestedArray))
```

This is a very smart workaround, in my opinion, you get the array as a string when parsed to JSON, so when you are parsing it back into Javascript, reference to the original object is long gone, you are just parsing the string so you get a nice copy of the array without mutating the original.

Drawbacks? Well, some people pointed out that this can work well when using strings and numbers, but for other types of values you might run into problems. Besides, I think that is a very unorthodox use of the JSON object, so it might raise an eyebrow if the line of code is not commented on.

But I also found a much cleaner and beautiful solution:

```javascript
const deepArrayCopy = nestedArr =>
  nestedArr.map(el => (Array.isArray(el) ? deepArrayCopy(el) : el))
```

This beauty works like this. Takes a potentially nested array, and maps through it (we know that maps return a new array, so we start with the right foot). The return value is a ternary operator that checks whether the element (el) in the array is an array or not if it is, it calls the function again on that array (so since it uses recursion it can go as deep as the nested array is). If the element is not an array, it just returns the element in the new array.

This was pretty cool, there is nothing like need to really learn something. Now I add this info in my tool belt: neither slice or destructuring make deep copies, you can deep copy with a hacky, yet cool, JSON workaround (albeit its potential problems), and there is also the elegant recursive solution I wish I had come up with by myself.
