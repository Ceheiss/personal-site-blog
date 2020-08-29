---
title: You Don't Know NodeJS
date: "2019-10-19"
---

I know, its Saturday. But well, this will be short.

Have you ever come across the books by ['Kyle Simpson']("https://twitter.com/getify") "You Don't Know Javascript"? Well I thought to myself "You Don't Know Node", and that might be a bit problematic, specially if I use JS frequently.

Before you frown upon me, I mean this in Kyle Simpson way, meaning I have some intuitions but nothing very substantial. I don't live under a cave, I know Node enables us to use JS as a server technology, and frameworks like Express are used on top of it to make nice and trendy full-stack MEAN, MERN, and now MEVN(?) apps.

That being said, there was a lot I was missing, but that has been partially mended this weekend thanks to the extraordinary wisdom of ['Tony Alicea']("https://twitter.com/AnthonyPAlicea"). Time to learn.

Since today is Saturday, and I intend to do other important things, like avoiding the existential void by focusing heavily on Netflix, I will just point out relevant things that caught my attention, and hopefully make a nicer post when I finish the course.

#### Here we go:

- The V8 Engine, responsible for running JS in Chrome, is actually a C++ program.
- Since V8 is a C++ program, I can embed it in my own C++ program.
- By doing that, I could extend what V8 can understand as valid Javascript, therefore enabling me with the expansion of the language outside ECMAScript scope.
- This already happens in the browser, since DOM manipulation objects and methods are not part of the ECMAScript standard.
- For a language to be suitable for the server side, some features are needed: like ways to deal with databases, accept and send responses, deal with files, and others.
- Javascript was not equipped for that... until Node came along. NodeJS, since is a C++ program with V8 embedded, adds a bunch of C++ and JS code that provides Javascript with the extra features needed to become a server side technology.
- So Node is not just JS that runs on the Command Line, is a library.

These are just first impressions, I'm excited to continue checking out the course. Is nice to to type 'npx create-react-app myApp', and see the magic unfold, but nicer is to look under the hood and unveil the mystery.
