---
title: "Dear Diary"
date: "2020-01-08"
---

"Dear diary" not very descriptive but intended as such. The reason? For once I'm not talking about something specific, but more about a series of things I've been up to during the apprenticeship since everyone is back from the holidays. Let's get to it.

![](https://i.pinimg.com/originals/24/24/b1/2424b13c835714d8492088ff64d2b7b6.jpg)

## Know !== Know-How

As I stated in a recent blog post, I learned of late a new way of organizing my code when it comes to building a web application. As it happens, that architecture that I tried to describe actually has a name: **UMV (Update Model View)** AKA **"The ELM architecture"**. So knowing it's name I found [this repo](https://github.com/dwyl/learn-elm-architecture-in-javascript) in the internet, which helped me solidify it's inner workings.

With that information I thought to myself _"cool, I know how it works, I will build something using UMV without peeking at the structure to see if I really got it"_. I started a new project and thought about building it with all the new "standards" I've been practicing (build the project in node using modules, write functions in a TDD manner, reduce mutation and side-effects at a minimum) and so I did.

Everything was good wind and smooth sailing (I choose something simple to build, so I could focus on the architecture) until it was time to watch the functions in action in the browser. Suddenly everything breaks, turns out that **browsers are not fond of how Node handles modules**. I spent a while surfing through the internet looking for solutions (things like Webpack where mentioned) until I settled for ['Browserify'](http://browserify.org/) to bundle my code. Is funny how some time ago I read in a Medium article that "I should learn Browserify" but it just seemed unnecessary and prematurre to me, well, not anymore. Now, the necessity of solving my issue led me to use this tool. `browserify src/index.js -o bundle.js` incantation and _PAFFF_ **habemus app**. _Oh joyful bugs, there is nothing like necessity to drive a point home._

After the app actually rendered, I had a small issue when updating it (there were some unexpected duplications on DOM elements). So I had to dig deeper in DOM methods until I found that `replaceChild(newView, oldView)` was what I was looking for. Long story short, it took me much more time to make a simple app that had tests, little side effects and mutation, and that was made with UMV architecture, than the time it could have taken me ifmI just "went for it". So why did I do it? Well, the code is much more maintainable and scalable. I'm not necessarily building more complex things than before, but I'm surely putting effort in setting myself higher standards in terms of quality.

![](https://live.staticflickr.com/12/94735395_9eb1ef92fd_z.jpg)

## To pair is to care

I've really enjoyed working this week on the **katas** with Preetham, we've been focusing on solving problems in a TDD way. We write the tests taking turns, we write the code to make it green, and we refactor it. We have had very interesting discussions in terms of how to solve the problems, and have learned as a team how to handle the ones we didn't know (today we learned the _-apparently-_ correct way of testing errors in **Jest** by diving into the documentation).

Today I also paired with Masha, who gave mee the opportunity to look into a "real life" problem that we tackled together. That was a great learning experience, and had a great time. I've set myself the goal to pair with different people in the company as a way to get exposed to the issues they experience each day, as well as to get ideas on how to better approach problems.
