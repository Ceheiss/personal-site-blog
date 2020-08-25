---
title: "In C you have to do what!?"
date: "2020-01-01"
---

Recently I started watching lectures of CS50 in my house. **What is CS50 you might ask?** Is a super popular course in Harvard that introduces Computer Science to students with or without previous experience and regardless of their major.

As not having a CS background myself, I though it would be interesting to expose myself to it. Since I have a lot of **Javascript** things to attend to in my apprenticeship, I decided to explore this in my house _'after office'_ hours. My initial approach is watch all the lectures (9 in total) once, as to have a big overview of everything, before I try to solve the problem sets.

Anyhow, today I watched the lecture on [memory](https://www.youtube.com/watch?v=cC9I3XxkZXw&t=4212s) and was actually very mind blowing. Having learned to code in JS, things like memory allocation or pointers seemed like distant and alien concepts. Today very breefly I want to touch on things that I found interesting.

Strings are not a "out of the box" data type in C. This has some interesting consecuences, for example, if you create two variables (suppose we have a library that provides strings) like this:

```c
string me = "Mike";
string myself = "Mike";
```

And then make a comparison `me == myself`, we will get `false`. Why? This doesn't happen in Javascript! Well, the thing is, strings aren't really a _thing_ in C, they are actually an array of characters. An array in C is a bunch of values stored **back-to-back** in memory. When I assign a variable to to an array, what gets stored is a reference to the place in memory of the first element (like `0x3456678`).

![](https://cs50.harvard.edu/college/notes/4/s_array.png)

So why does `me == myself` fail? For the same reason that `{a: 1} === {a: 1}` fails in Javascript, what we are comparing is the address in memory, not the values. Because in JS strings are primitive, when we store them in a variable, we are actually storing a value, in C we are saving the address to the first character (`char *`), so if we want to compare the values we would have to do it in a different way (like looping through the array, or using a library with a useful function).

### Random Things that caught my attention

- If I save the string "Mike", it actually makes an array of 5 contiguous places (side note: each `char` is a byte). The reason is that the last value is `\0` (a convention to indicate all zeroes or `null`). That is useful for C to know when the array ends (we already now in which position starts).

- You can do very interesting things, like declaring two variables that will hold an `int` for example, and then use pointers to make both variables reference the same space in memory. In Javascript that is possible if talking about objects like this:

```javascript
const a = { num: 1 }
const b = a
```

But if you do the same with a primitive it will copy the value. I just found very cool that you can have that amount of control in C.

- Telling where to save values is one part, managing the amount is another. If you are trying to save something that needs more memory than expected, you might encounter weird behaviours.

- I wonder if there are ways of accessing in Javascript the places in memory when values are stored, if we can modify them, and if this would be a relevant/desirable/or a very hacky thing to do. Questions, questions.

- Going low level has made me much much more appreciative of the wonders of abstraction and high level languages. Learning about this concepts helps me to abstract what is essential and what is contingent in a programming language.
