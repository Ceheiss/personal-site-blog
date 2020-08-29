---
title: Deeper into JS
date: "2019-10-21"
---

The Kata of today was working with ['ES6 features'](https://jskatas.org). We worked with Reflect and Array.from, in all honesty, I didn’t make too much of Reflect, in terms that its usefulness didn’t resonate with the kind of work I have done (or imagine for that matter). Array.from on the other hand seems like a very handy method.

Imagine you are doing some DOM manipulation and you want to work with all the children of a particular element, you save them in a variable and then try to map or filter or do something, just to find out that is not working. Oh, you realize you have a NodeList, looks like an array, but not quite, you don’t have access to map, filter, and other nice things. You feel sad, you look for answers in Stackoverflow. Sadness.

Well, Array.from to the rescue. Only thing you need to do is pass your array like object to it, and your problems are solved.

```javascript
Array.from(NodeList)
```

It will make a shallow copied array from that list, and you will be good to go. Even better, as a second argument it accepts a map function, so you can convert the NodeList into an array and modify it’s elements in one line of code.

You could also convert objects to arrays, provided the keys are numbered and the final property indicated the length of the elements present in the object, like

```javascript
{0: "first", 1: "second", length: 2}
```

There is much to Array.from, but I will leave it that.

I continued my cruzade of replicating array methods using TDD, and managed to do lastIndexOf, includes, and basic functionality of slice. Thinking about every spec that each method should have, translate them into tests, and tackle them one by one, has been a great exercise of breaking down big problems into chunks, and focusing on just one at the time.
