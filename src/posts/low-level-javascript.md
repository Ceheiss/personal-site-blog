---
title: Low Level Javascript
date: "2019-10-24"
---

As part of my daily Katas, I’ve been recreating several array methods from scratch using **TDD**. I have a list of methods to work on, I take one, read the documentation, generate a ‘todo list’ of features that the method should have, transform that list into tests, and proceed to solve them one by one.

This exercise has been very useful for me: I’ve been getting a lot of testing practice, I’ve learned a lot of these methods in a more detailed manner (because I have built them myself), given me the opportunity to go as deep as looking at the **ECMAscript** specifications in hopes to find clues on implementation, focus not only on how the elements that are passed to the functions are modified (or not) but also be mindful of the returning values (for example, push returns the length of the array, not the array itself). Finally, it made me appreciate how useful many of the built-in functions are, and how dependent I am of plenty of them.

Today I worked with **pop**, **push**, **shift**, and **unshift**. Although they are quite similar, each presented unique challenges. Here are some things I learned today:

1. It can get quite challenging to go low level. I was working on push(), and thought **“easy, I can reuse the **concat** function I defined the other day”**. So I went to check the code for concat, only to realize that I used push method there… the shame. I have to solve it without concat, otherwise I would be using **push** to recreate push, that is circular and therefore forbidden. I was able to build push and then replaced in my concat function as well. Nothing crashed, awesome.

2) I was thinking how to implement pop() and discovered something I had no idea about. In Philosophy there is this concept of **“Performative Language”**, that is, a sentence that doesn’t describe the world but affects it (**“I hereby, declare you married”**). So I thought, **“how about I just declare that the length of the array is 1 element short than it really is?”**. I could create a mismatch (by changing the length property, I would just have an inaccurate length) or I change the array. The later happened, array.length changes is performative. Sweet (although things get more entertaining when dealing with array-like objects like **{0: ‘a’, 1:’b’, length: 2}**, a lot of tweaking).

3. There are some edge cases that are difficult to reproduce. For instance, the original **push** can be called in an array-like object by means of using **call**:

```javascript
    let tester = {0: 1, 1: "a", length: 2}
    let push = Array.prototype.push.call(tester, "b");
    // returns
    {0: 1, 1: "a", 2: "b", length: 3}
```

Basically we are calling the method that is part of the prototype of the Array object, and in the first argument we are setting where the **‘this’** should point at (at our tester object). The second argument is the element to be pushed.
Since we are defining functions and not methods (attached to a particular object rather the **global**). I thought it would be strange use call, so I decided to accept the array-like objects as valid arguments, and handle them inside the function. They work fine that way, and I actually prefer it so.

Getting deeper in these functions has been an amazing journey, [here is the repo](https://github.com/Ceheiss/testing-tests) if you feel like taking a look.

If you have any comments, feel free to message me on [twitter](https://twitter.com/Cristobalheiss).
