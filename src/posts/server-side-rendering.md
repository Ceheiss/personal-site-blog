---
title: What is Server Side Rendering and Client Side Rendering?
date: "2020-04-13"
---

![](https://www.clariontech.com/hubfs/Server.vs.Client.png)
In the early ages of mankind, when Geocities roamed the earth and Netscape was king, the web was nice and simple. There was a bunch of websites, all linked to together with anchor tags, to move from one website to another you clicked the hyperlink that made a request to a server, the server processed the request, sent the HTML, the browser rendered it and that was it. That was Server Side Rendering.

## CSR

Later in the game, with a more mature Javascript, a different way of rendering information to the users started gaining track, the SPA (Single Page Applications). SPAs tried to behave more like Desktop Apps, so the idea was to send a big chunk of JS on the initial request, that makes the web app slower to load, but once that happens, the JS handles most, if not all interactions. The web app then becomes super fast, because it doesn't need to constantly be making requests to a server.
![](https://miro.medium.com/max/8930/1*CRiH0hUGoS3aoZaIY4H2yg.png)
So how we see in the image (which I took from [here](https://medium.com/walmartlabs/the-benefits-of-server-side-rendering-over-client-side-rendering-5d07ff2cefe8)), a trade off we have in Client Side Rendering, is that we spend more time looking at the loader and waiting for interactivity to be ready. It is also not the best for SEO performance, because when the crawling happens, you don't see right away what the content is about, if it's a React App, the only HTML is a single div where all of the JS is going to be injected to. So yes, we have awesome, rich interactive pages, with faster response, but as in anything, you gain some and you lose some.

## SSR

So how about SSR then? What is good about it?
![](https://miro.medium.com/max/8468/1*jJkEQpgZ8waQ5P-W5lhxuQ.png)
Since the initial JS is small, the initial rendering is faster. So for the user it feels it loads fast, although once loaded any additional interaction will be slower than in CSR (because we need to make new requests). We spend less time looking at the spinner, and SEO is also happy.
So is it better then? Well, it only depends. Instead of getting dogmatic about it we have to think about the pros and cons of what we want to build. If I want to make a Newspaper app for instance, where there is little interaction necessary and is super relevant that the SEO knows about my content, I would go with static files in a SSR style. If my page instead is super interactive, or I want to build something like a calculator, a game or something else, CSR would be my choice.

## Middle Ground

But is there a middle ground for all of this? As I came to understand it there is. Although I've never used it, there is a `react-dom/server` package that allows you to do a SSR React App (at least sort of). As I understand it, you first render the view on the server and send it as a string (so the first render will have something, not a div). Once is rendered JS takes over and does a process called hydrating which gives the interactivity.
So you can do initial server request to load something fast, and wait for the interaction. There are other tricks like lazy loading things (in a page we don't need to request everything at once to the server, we can have a lightweight initial render, and make new requests to the server and render more upon interaction, like scrolling down on a page).
In all honesty, I'm still confused with some terms, but I think I now understand the basics of it. Also is quite nice to finally now what Next.js do, and why people talk about it, is a framework built on top of React that makes the SSR easier. Now that I know more about the pros and cons of SSR, and CSR, I can understand why would somebody want to build something with Next.js.
