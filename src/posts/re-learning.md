---
title: Re Learning
date: "2019-11-10"
---

I've been reading ['Code'](https://www.goodreads.com/book/show/44882.Code) by Charles Petzold. Awesome book, Charles takes you from the very basics of human coding (from Morse Code, Braille, and onwards), and builds up until how a computer works (haven't got there yet). The nice thing is that he takes his time, no rush, before understanding how a flashlight works, he explains elementary electronics, how a circuit works, what is the current, voltage, and resistance.

Before talking about binary he takes you on a journey about how we would represent numbers if we had less fingers, and so decided to have just 8 or 3 digits (once you get the idea, binary is just another option, the greater concept has been explained).

I was reading the chapter about binary (that he later follows with a Boolean Logic one) and occured to me that building my own binary-to-digit app could be fun (to figure out how to apply the algorithm in a program), and doing this using TDD and modules to break up my logic could be a nice way of turning this into a kata.

While I was working, it surprised me how different is to code trying to follow better practices. When I thought of functions to be tested, I had to make sure each function had a specific role and could work independently (I was self conscious that that was not always the case with my code), so it took me more time than usual, because I was not only thinking about how to solve the issue, that was already done, but I was thinking on how to organize it better.

The idea of having modules made me think twice about how I build my functions and what are they doing. I left all DOM related logic in my central file (app.js), so I could keep each module with one generic function that could be tested and imported in app.js to do the work. I don't think I accomplished it fully, but that is why this is a kata, I'm now aware of it, and I'm practicing to get it better next time.

If you feel like converting some value, the repo is [here](https://github.com/Ceheiss/binary-converter). I want to make this look better (would be good to refresh CSS, flexbox, grid, and whatnot), but also leave space for further scaling the app (like decimal to binary, to hexadecimal, etc).
