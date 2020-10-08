---
title: On to the next adventure!
date: "2020-10-08"
---

There is not a single person on the planet that hasn't been affected in one way or another by the global pandemic (ok, it MIGHT be the case there is someone not affected, but hyperboles are sometimes necessary), my case is not the exception. The Corona times lead to a restructuring of the company I was working on, and I alongside teammates and collegues weren't in the picture.

I'm very grateful for the time (although little) that I spent there, for the people that let me rub elbows with them, pair programming, and grow. That being said, things move on and I'm super excited to say that I'm starting my next adventure a week from now, as a front-end developer.

As I approach the first day, I decided to work on my programming skills, and revisit things that I learned during my apprenticeship. Besides, the fact that my new team works with a different stack, motivated me to learn a bit in advance of my role. This Blog post is about some early encountered differences between React and Angular.

## Tipping my toes into Angular

At my previous work, we were working with React. During my apprenticeship I did an awesome tutorial by [Rodrigo Pombo about building your own React]("https://pomb.us/build-your-own-react/"), so I think I have a basic, yet decent understanding about how React works. When I was told I was going to be working with Angular I thought, "it can be that different right? Is JS after all", well turns out it kind of is.

I dove into the [Angular Docs]("https://angular.io/docs") (which are very nicely done), and used Angular CLI to build an app (quite lis create-react-app). In the beginning, I saw a lot of similarities, like the use of components as building blocks and composability. But later a lot of things started feeling a little bit strange, I didn't understand how decorators bound the templates with the class components, it was weird for me to separate the templating from the components data (in React we return the templating by writing JSX, is all in the same place). Also, the way templating was done, if I wanted to display a list of sorts in React, I would just map through the list and turn each element of the list into JSX, like:

```javascript
myList.map(item => <li>{item}</li>)
```

If I wanted to conditionally render something I just used a ternary. Well, not in Angular. Since the templating in Angular is done in an actual HTML file, we don't have access to typical JS functions and methods. In that sense is much more in tune with something like **Handlebars**. If we want to display a list I would do something like:

```html
<ul>
  <li *ngFor="item hero of items">{{item.title}}</li>
  <li></li>
</ul>
```

`*ngFor` is a thing called a directive, we also have those for conditional rendering like `*ngIf`, **pipes** for fast text formating and so on, the thing is, is a whole different approach.

## Different Paradigm

The other thing that was quite new form me was the apparent shift in paradigms. At my previous team we favored functional programming principles, try to keep mutation low, functions pure, and all that Jazz (although not super strictly). I noticed a different approach in the Angular community as soon as I took a sample project and tried to unit test some methods.

Testing a pure function is a breeze and a joy, functions always return something, and always will return the same thing if given the same parameters. Now I found myself diving into methods that had the purpose of changing the state of the class, and therefore were strictly procedural and didn't return any value. Damn, that is something I don't know **yet** how to handle.

Also, I see much more frequently, because of the Typescript aspect in Angular, the use of the `private` or `public` keyword in classes. That was completely alien to me (I think it doesn't help that I never learned OOP properly), so I'm still figuring these things out.

## Bottom Line

I'm moving into new territories and although scary is actually quite exciting. As a self-taught developer, I will hve the opportunity now to learn hands on a different way of solving problems and using a different framework for it. Getting out of the comfort zone, the fine embrace of the campfire to get a walk into the cold is always hard at the beginning, but the muscles end up warming up at some point. This post is way too long, and there are other things I wanted to say but I leave them for the next one. If you read until now, I have to say two things: 1. Thanks, 2. You are a maniac. Cheers!
