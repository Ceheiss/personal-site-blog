---
title: Recursion over iteration, a different approach
date: "2019-10-29"
---

After some ground definitions in the first chapter of “The Little Schemer”, such as `car`, `cdr`, `eq?`, and others. The second chapter presented the concept of recursion. I decided I will present two of the main functions that I went over to, and break them down to explain the insights I got from them.

```lisp
(define lat?
  (lambda(l)
    (cond
      ((null? l) #t)
      ((atom? (car l)) (lat? (cdr l)))
      (else #f))))
```

The first line is naming the function `lat?` as this function is supposed to check if all _S-expressions_ in the list are atoms or not. The second line is lambda function that takes a list as a parameter, as I understand it is like an anonymous function (although here we are defining a name for it). `cond` in line 3 is short for conditional, so it means that some questions are coming. Now to _the meat_.

The function starts by checking if the list is empty, if that is the case it returns true, if not it continues. The fifth line is where recursion hits, so basically it checks if the first element is an atom, if it's not, then our job is over, if it is, then we call `lat?` again, but this time we pass `cdr l` as a parameter (since we already checked `car l`) and the function gets called again.

So the function will call itself until one of two things happen, either all elements are atoms so eventually what gets passed to `lat?` is an empty list so it will return `#t` on line 4, or it will hit false.

The second function looks like this:

```lisp
(define member?
  (lambda (a lat)
    (cond
      ((null? lat) #f )
      (else (or ( eq? ( car lat) a)
                (member? a ( cdr lat)))))))
```

Since lines 1, 2, and 3 are very similar to the previous example, I will jump into line 4. We start with a similar expression `null? something`, I think this is quite relevant, since it provides a way of escaping the recursion (in this case, if the list is empty). Line 5 runs if the list is not empty, and runs the `or` operator.

The first expression is `(eq? (car lat) a)` that just checks is the first element of `lat` is equal to `a`, if that is the case, then `a` is a member of the list, if not, the second expression is run `(member? a ( cdr lat))` is that T or F? No idea yet, it uses recursion to call the function again, only the with one less element to take care of (thanks to `cdr`).

#### The Take Aways

Going through these examples has proven to be very interesting, if I were to define this in _Javascript_, I would have iterated through each element of the array and compare each time to the searched element. The way recursion is used to solve the same problem feels right and quite elegant, I like how it’s able to provide new values as parameters to the function without having to change the originals, just doing it dynamically.

I also found very clever the use of OR as a means of calling the recursion. Since we are interested on the value of the first expression to check membership, if it doesn’t get a truth value it runs the second one, but the second one won't stop the function just yet, because it provides a recursive call, forcing the function to go again, and again.

I don't think I would be able just yet to come up with beautiful recursion based solutions like the ones provided, but reading them has been quite beneficial and has awakening much interest and curiosity in this programming approach.
