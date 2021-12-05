---
title: How to Design Functions 1b
date: "2021-12-05"
---

So in the last post we learned about the BSL language, how it works, and how it executes our code (Racket evaluates the expression by recursively reducing operands to values). The second part of week one (known as 1b), we get introduced to the **How to Design Functions Recipe** (_HtDF_ for short).

The main premise is that hard problems can be much easier to tackle if we take a systematic approach to them. So the steps of the **HtDF** are the following:

1. Signature, purpose and stub.
2. Define examples, wrap each in a check-expect.
3. Template and inventory.
4. Code the function body.
5. Test and debug until correct.

The idea is that each step of the recipe helps us with the next (signature, helps with the purpose, the purpose with the stub and so on). This might be a bit too abstract at the moment so I will write an example.

Imagine we want to create a function that tells us if a word has less than 5 characters (obviously the HtDF recipe is an overkill here, but is for the sake of example). First thing we need to ask ourselves, what is my function receiving and what is it returning? Well a word is a string, and we want the answer to a yes/no question, so we return a boolean. That is the signature of our function:
`; String -> Boolean`.

Later we want to think about the purpose of the function, what is it supposed to do? `; Given a word return true if word has less than five characters, and false if it doesn't`. Good, that is our purpose.

So now we move on to the stub, here we just define our function and return some dummy result that matches the type we defined at the signature (a boolean in this case) so we do something like:

```lisp
(define (less-than-five? word) true)
```

Once we have a stub to our function we can start writing our tests, what results do we expect from our function given specific parameters?

```lisp
(check-expect (less-than-five? "hello") false)
(check-expect (less-than-five? "galeano") false)
(check-expect (less-than-five? "hi") true)
```

We try the three possible scenarios (exactly 5 characters, more than 5, less than 5). If we run the code now oue tests will fail (two of them at least, since we hardcoded `true` as an answer). But that's ok, the important aspect is that they are correctly formulated.

After this we write a template to our function, in this case is quite straightforward:

```lisp
(define (less-than-five? word) ...word)
```

Quite similar to the stub, but in this case we indicate with the `...word` that in the body of the function we shall perform some operation with the word parameter.

After all these steps, we finally write our function and refine it until our tests pass. We end up, all together, with this (; comments a line):

```lisp
;; String -> Boolean   - signature
;;  Given a word return true if word has less than five characters, and false if it doesn't - purpose
;; (define (less-than-five? word) true) - stub
(check-expect (less-than-five? "hello") false)
(check-expect (less-than-five? "galeano") false)
(check-expect (less-than-five? "hi") true)
;;(define (less-than-five? word) ...word) - template
(define (less-than-five? word)
 (< (string-length word) 5))
```

So if the syntax of the answer seems weird, refer to the previous blog post. But basically since we use the `<` predicate, we return a boolean with the answer. Our tests should pass. And taaaada, we finished.

### The Learnings

I think that the **HtDF** is a very effective way to write functions. In the first place, I think there is a lot of value in thinking ahead of time what our function should receive, and what it should return (hell, isn't that -some part at least- why people decided to start using Typescript over JS?). The purpose of the function works also as documentation, as well as a way of clarifying to ourselves what the function should do (how can we solve something if we don't understand the problem).

The **stub** I think it is just instrumental so we can run our tests (and most of them fail of course). This is awesome, because it reflects a lot the **TDD approach**. We first think of the expected results of our functions given specific parameters, and we care about the function itself later. Not only do we make sure our function is ready when the tests pass (if it is sufficiently covered of course), but we are enforcing well tested functions from the get go.

Templating is just also instrumental to start writing the function. I think it helps with the "writers block" (or is it "programmers block" in this case?). We start with something, we just need to "thicken" the function.

In general, I think that it gives us a plan and a way forward to break problems in little parts and approach them systematically. I've tried this recipe for solving algorithms using JS as language (things like ["CodeWars"](https://www.codewars.com/)) and this approach has helped me a lot to clear and focus my head, plus, as you can see, is language agnostic so anyone can give it a try. That ends up my first week of learning, onwards with week two!
