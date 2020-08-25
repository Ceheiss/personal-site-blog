---
title: "Into the App"
date: "2020-01-27"
---

When learning to code, the focus goes firstly into trying to get a decent grasp of a programming language. You try to understand the syntax well enough so that you can solve problems with it, nevermind style at this point, is a matter of realizing that with some commands you can harness this ultra fast and precise beast called computer, and although mighty, is picky and super literal, so we have to break out of the communication imprecisions we've been born into with natural language, and start thinking with more logic and precision, at least that is the aim.

A language on its own is real just as a concept, we need it to run somewhere, in an environment. Whether is the command line, a browser, or elsewhere, we need some context. For me, with Javascript, it was the browser. Getting to know HTML and CSS, basics of the DOM and how to interact with it. Now you can build something interesting that transcends the browser's console.

But getting something to run as you expect it to, is only half of the way, the other half being how the program is written. Maybe you built some nice app and you leave it at that, someone wants to collaborate only to find it seemingly impossible to understand what you were trying to do, or maybe some time later you feel like adding a new cool feature, only to notice that the way you structured your code (or the lack of structure) makes it very difficult to scale without major refactoring. Perhaps you want to add some tests, because you heard it was a good idea, only to realize that your functions are bloated with side effects, making it a mission impossible.

So you set yourself to learn about better coding practices. Find and practice patterns to make your code scalable and maintainable. You look into **TDD**, you try to tightly control side effects and mutations as much as you can, cool. Then you expand that into the environment of your language, how do I organize my Javascript to play along with HTML and CSS without making a mess? How do I keep state in a controllable and predictable manner? Time to look into some design patterns, **MVC**? **UMV**? Whatever moves you, but look into one.

![](https://pbs.twimg.com/media/DYkaAtAXkAAbsVt?format=jpg&name=medium)

Nice, so that is it right? Well... not quite. As previously stated, it depends deeply on the environment. Since thee beginning of my apprenticeship I focused more on the former. I started building old school JS apps, all in one file linked in the script tag, no real concept of testing, of avoiding side effects, or knowing how to keep state in a maintainable way without mixing it with the DOM. I've been working on not making more complex apps per se, but making them better. All that is good, but being in a company that runs a big application entitles much more things.

This makes me think about **Rob Pike's** [article](https://research.swtch.com/vgo-eng) when he says

> "Software engineering is what happens to programming when you add time and other programmers."

(Thanks Preetham, for the link). When working in a large scale app with different hands touching code, the environment is bigger and there are more things you have to be aware of.

A project has different people working on it, you need some basic standards like linting, prettifying and others. When each contributor wants to push changes we need to make sure all of this standards are being met, that the tests are run, and everything works fine. That can get chaotic and prone to error so you might want to automate all of that building process, what is **Jenkins**?

The company might have multiple teams working each on different services that compose the main application, how do we architect them together? What is **Microservices**? If each team builds their own service with their own stack, that means that there is a bunch of different set ups that a server would need to run thee app, do I need Node? or other thing? Maybe a way of automating the set up so that each machine that runs the app has all the information to create the necessary environment to run the app, what is **Docker**?

The point of this flow of consciousness is to show how web development, when done in a big scale, entitles much more than knowing how to program. There must be an understanding about how the pieces fit the puzzle, why all this tooling makes sense, an how complex is to have an application that is receives inputs from different sources, that has to be ready to add features, and persist in time. I'm beginning to get a grasp of it.
