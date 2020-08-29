---
title: The Unexpected Library
date: "2019-10-22"
---

Sometimes unexpected things happen. For example, today I planned on reading about TDD and Unit Testing, and later blogging it. Yet, here I am, and -spoiler alert- this isn’t a post about TDD… at least not conceptually.

As a mean of practicing Test Driven Development, and familiarize with beautiful array methods such as map, reduce, indexOf, reverse and other goodies, I started a repository you can [check out here](https://github.com/Ceheiss/testing-tests). The idea is not an original of my own, but comes from the curriculum [Gordon Zhu](https://twitter.com/gordon_zhu?lang=en) put together in [Watch and Code](https://watchandcode.com/). Anyhow, back to my point.

So I was working on the Array.reverse method when I noticed that although reversing the order of the elements in an array is very straight forward, I had no idea how to reverse an iterable object that looks like this:

```javascript
	{0: 'a', 1: 'b', 2: 'c', index: 3};
```

I talked about this with my mentor [Wolfram](https://twitter.com/wolframkriesing), and he suggested that I could use Array.from() to make that object an array and later use it in my reverse method. Crap, I wrote a freaking article about Array.from just yerteday and didn't think of that. Anyway, somehow I felt that using this high level function would defeat the purpose, I was trying to replicate after all. Wolfram suggested I build my own Array.from and then use it as I please. Hell, why not, I’m already doing replicating a bunch of methods, so that seemed like a good idea.

### The Library

Right after I finished writing the basics of Array.from(), I noticed the function accepted a callback as a second argument to map the newly formed array. Dang it, I wasn’t going to use the map function to do it (the whole reason I was creating my version of Array.from was to not used these functions), yet writing all that code for map as a part of Array.from didn't make sense either... but maybe there was a way out, I realized I had built a map replica before.

And then it clicked, maybe I can just store all the array method replicas I've been writing on one file, and used them as I need just like a library. That is exactly what I did, I took a bunch of functions I already replicated (not all of them yet) and called the file "rewriteLibrary.js". So now I could access my homemade map function, and used it in the Array.form(). No need to cheat by using Array.prototype.map.

Later I went back to the 'reverse' method I was working on, and was able to handle receiving an iterable object as opposed to an array in order to transform it... but... yeah, I returned a reversed array, not a reversed object. That means I entered {0: 'a',1: 'b', length: 2} and returned ['b','a'] not bad, but not quite what was needed: {0: 'b',1: 'a', length: 2}.

No problem, I created a function called arrayToObject to do just that, I added the function to my rewriteLibrary, and finally used it in reverse. It worked, yay!

I’m aware of the absurd of creating a library of (mostly) already existing functions (isn’t our very existence just a big absurd anyway?), but jokes aside (or not, if your an existentialist) this has been very educational for me. First, it made me appreciate more libraries, understand how they can come to be. Second, I think is kind of cool that this function replicas end up being used in yet other replicas, feels organic. I thoroughly enjoyed this exercise and I’m very eager to further expand my rewriteLibrary of (mostly) already existing functions.
