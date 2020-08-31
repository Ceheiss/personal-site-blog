---
title: New Home and Trying Gatsby
date: "2020-08-31"
---

I recently decided to build my website again, why? because [my first portfolio]("https://codepen.io/ceheiss/full/aVyJVW") although colorful and fun was way too old, and because this time I wanted to keep a blog in the same domain as my portfolio. My old website taught me a lot when I made it, but I was itching for something different, and Gatsby was buzzing in my ear for a while.

I read that Gatsby was good for blogs, that it was fast, and the setup to route to different pages was butter, so well, I tried it by myself and this are my main takeaways.

### What I liked

The first thing that I loved about Gatsby was how simple was to set up everything at the beginning. The documentation is quite nice, and if you are familiar with react you can have something going on in no time. You build your components (most likely in the 'components' folder) and then in the 'pages' folder (here naming is not optional) you assemble them to create each page you would like.

In the pages folder, you write one file for each page you want to create (like index.js, about.js, contact.js, etc.) and in each file, you export the whole page as a react component. There is no React Router you have to set up manually, it works straight out of the box.

## The Unexpected

At the beginning of my personal site, I had two pages: homepage and blog. I had a nice header component that enabled me to move between the two, and I looked in the documentation on how to make a **GraphQL** query to get mi **.md files** in order to create pages for them based on a template. That seemed a bit of magic for me, I guess that happens when you use GraphQL to query relevant data for your site and you... well, don't know GraphQL. But the magic wasn't a problem… yet.

Before publishing my site as MVP, I migrated all the posts I had in my [old blog]("https://ceheiss.github.io/reflections/"). All 30 of them. Suddenly scrolling _ad infinitum_ started to seem like a bad idea. How is that term again to divide content and access it partially? Pagination? Oh, how do I go about that?

After banging my head against my sofa for while, I understood that there was no way around it, if I was going to be using GraphQL I had to at least understand the fundamentals, otherwise tweaking the code will be impossible. Where to start? Gatsby docs recommended [How to GraphQL]("https://www.howtographql.com/") it was free, short, and sweet so I went right in. OK, maybe its time to dive back and try this pagination again.

## Erasing Code

After spending a while trying to understand what GraphQL was all about, and playing more with **GraphiQL** an in-browser GraphQL IDE available at \_http://localhost:8000/___graphql_ during development, I decided to go back.

One of the first things I noticed, I was sourcing all of my posts and I was ordering them with a custom function I made that worked with the array, checked the date string, and returned a list ordered by date. I was proud how that worked out until I realized that was stupid, EHEM... query parameter anyone?

```
 allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    )
```

There, much better. Then I realized I also had made this function to format my date so I get something nicer than "2019-10-08" in my blog post, nice! Well no, query parameters again:

```
date(formatString: "DD MMMM, YYYY")
```

I felt stupid, but hey, erasing code is always good. Trimming out fat, I was making progress.

## The Learnings

So, to keep this short. After spending some time with GraphQL the docs started to make more sense regarding pagination and I was able to pull it off (I also had the help of tons of resources I found online).

Besides, I also learned that **if you don't understand a tool that you are using, that will not only immobilize and prevent of making adjustments in fear of destroying everything, but it will also can make you work double** (like my extra functions). The only way of conquering the fear of destroying something is not not to touch it, but to spend time with it long enough to to feel comfortable around it, sort of like taming a wild animal.

I'm glad **I decided to dive into it** and that my blog is not an infinite scroll, and happy that I got to learn something new. I'm excited for my new site, as I want it to be ever improving, filtering posts by themes, adding animations that are also responsive, and so much more. But all in time, this is my **MVP** and I'm happy about it.
