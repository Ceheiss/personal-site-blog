---
title: Into The Realm Of Testing
date: "2019-10-23"
---

Wait, isn’t Unit Testing the same as TDD? Is TFP a thing? I should write a test before even writing the code I will be testing in the first place? As I incurred into the realm of testing this questions were popping in my mind. I don’t have yet an answer to all of them, but I will share with thy, dear reader, my findings.

Ok, let’s go from generic to specifics, and in the array of topics I will touch today, Unit Testing is the overlapping concept. So what is Unit Testing? Well, when we write code we usually do it in order to get an specific behavior, right? If I write alert(“Hello human”); in a JS file, I expect that someone will encounter a friendly pop up if they are on a browser. Sadly for us, manually checking the expected behavior of every bit of code can get quite overwhelming, not to say prone to errors. So that is when Unit Testing arrives galloping in its noble steed.

Imagine you are a doctor and want to check a healthy body. You could create a series of tests to check if several parts, or units of the body, are healthy and work as they supposed to. You could have a test to check arms, other for the head, other for the legs, the heart, and so on. If you are exhaustive in your tests, and the person passes each of them, it means the person is healthy. All analogies break at some point, but I think you get the picture. IF we design multiple independent tests, we can evaluate the whole without going (that) crazy.

But what constitutes a part? A fucntion or a if-statement? An arm or a finger? Well, I didn't found a unique answer, the only rule of a thumb, is that each unit test should be capable of executing independently. Besides that, it really depends, they could be functions, or a group of lines of code that work together.

So the idea behind Unit Testing, is to break down how each relevant part of the function should work, so we can make sure that every expected behavior is considered and checked. This is quite useful, because it helps maintain code. If you refactor, and all the tests are passing -all the little behaviors that compose the big function are doing their job- then you can both improve your code AND breath relieved.

### TDD and TFP

So we know what Unit Testing is, in a broad sense, and what it should do. But the question is not only what, but also when. TDD stands for Test Driven Development. The idea behind TDD is that you should write your tests BEFORE you write your code. Yes, it might sound counterintuitive, how am I going to check a function I haven’t even written? Usually one would think that you write your code first and then create tests to assess its quality, but that is not the case here, and there is a reason.

As I read in one of the sources (that I do not recall right now) regarding TDD, is that the relevance is in the second ‘D’, meaning ‘Driven’. By writing your tests first, and stating the expected outcome of it when correctly executed, you let the test ‘drive’ you in how you write your code. It provides you the exact behavior that that piece of code should have, and you later write the code to hopefully satisfy that demand.

So TDD is a subset of Unit Testing, is a methodology on when to do the test (if someone decides to write code first and then test it, that would be Unit Testing, albeit it won’t be TDD).

Now, things get a bit murky when looking for the specific difference between TDD and TFP. I don’t claim to have a right answer, but what I found out from multiple sources is that TFP stands for ‘Test First Programming’, so basically it’s just setting a rule of when the Unit Testing should happen, is saying that when doing testing you should do it before writing the code.

So, as my understanding goes, TDD would be a subset of TFP in terms of that is a way of doing Unit Testing before writing the software (so it suffices the temporality condition), but it also fleshes out a methodology to do it (that includes refactoring the code and other goodies). As a Venn Diagram goes, TDD would be a part of TFP, and TFP a part of Unit Testing. But I could be wrong.

### Test Doubles

I’ll just keep it short and sweet here, partly because this is a humongous post, and partly because is the area in which I ventured the less.

In order for a Unit Test to be one, a necessary condition is that the Unit Test runs independently from any other Unit Test. Sometimes reality is a bit more complex than that, and our code uses some external dependencies in order to run smoothly (a call to a Web Server, a Database, or something). Test Doubles (just like Hollywood Doubles for Film Stars), are used to manage those external dependencies in a controlled manner.

Things like Stubs, Mocks, and Fakes have the job of simulating these dependencies (each have their own level complexity, but I won’t get into that). The point is, that with Test Doubles you are able to test your code in isolation, and you can check that each behavior works as it is supposed to if everything goes right.

It might be the case your code might not act as you thought because the server to which your app made an API call got shut down and never responded, or some mouses destroyed cables and made a Network issue, or who knows. If you test with Test Doubles, and checked your code in isolation, at least you’ll know something, that at least this once is not your fault.

==================

- Please don’t take any of what I wrote as documentation. This is but a reflecting blogging exercise of a subject I investigated today. I’m not an expert, I could have misunderstood some concepts,
