---
title: Using Lists and Recursion in Racket
date: "2022-05-07"
---

Sometimes we need to operate on data of arbitrary size, meaning, we are not quite sure the number of elements we are dealing with (think for instance, you receive a list of countries visited by different users). How would we go about it Racket? Will we for-loop through the list length? (newsflash, we won't). That is this week's topic, we will learn about how lists work on Racket, how to make a Data Definition for these cases, and finally how to make functions that will operate on this type of data. It’s a bit of land to cover, so let’s get started.

## How to Create and read listsFor this week 

To define a list we use the **cons** primitive followed by a value/expression. If our element is the last or only in the list, the second parameter to **cons** is the keyword **empty** (which indicates the end of the list). In order to make lists, we simply nest const constantly as the following arguments like here: 

```
(define L1 (cons "Systematic" (cons "Program" (cons "Design" empty))))
(define L2 (cons 1 empty))
```

How do we read those values?

`(first L1)` will return “Systemic” and `(rest L1)` will return `(cons "Program" (cons "Design" empty))`
With that considered, if we want to get the third element, we will do something like:
`(first (rest ( rest (cons "Systematic" (cons "Program" (cons "Design" empty))))))`

Well, not really, there are some primitives like second, and third, but since the mechanics of how this works is important, we are not going to use them.

Let’s work a simple example out (I’m dumping the whole code now, but we will come back to it, to look at it piece by piece):

```
;; ListOfString is one of: 
;;  - empty
;;  - (cons String ListOfString)
;; interp. a list of strings
(define LOS1 empty)
(define LOS2 (cons "McGill" empty))
(define LOS3 (cons "UBC" (cons "McGill" empty)))

#;
(define (fn-for-los los)
  (cond [(empty? los) (...)]
        [else
         (... (first los)     
              (fn-for-los (rest los)))]))

;; Template rules used:
;;  - one of: 2 cases
;;  - atomic distinct: empty
;;  - compound: (cons String ListOfString)

;; ListOfString -> Boolean
;; produce true if los includes "UBC"
(check-expect (contains-ubc? empty) false)
(check-expect (contains-ubc? (cons "McGill" empty)) false)
(check-expect (contains-ubc? (cons "UBC" empty)) true)
(check-expect (contains-ubc? (cons "McGill" (cons "UBC" empty))) true)

;(define (contains-ubc? los) false) ;stub

(define (contains-ubc? los)
  (cond [(empty? los) false]
        [else
         (if (string=? (first los) "UBC")
             true
             (contains-ubc? (rest los)))]))
```

## Let’s break down the program.

```
;; ListOfString is one of: 
;;  - empty
;;  - (cons String ListOfString)
;; interp. a list of strings
(define LOS1 empty)
(define LOS2 (cons "McGill" empty))
(define LOS3 (cons "UBC" (cons "McGill" empty)))
```

Here we have a well formed self-reference in the data definition. It works because we have two cases, the self-referencial one, and one that  is non-referential (base case, in this case is `empty`) which leads to an exit from the recursion (if we reach empty we return a value, we don’t go on to call the function again.

The rule is to have at least one self-referential and one base case, but some may have more of each.
Because it is compound data, we have a “is one of”. In this case, we notice that LitOfString is self -referential, meaning that both empty and (cons String ListOfString) are valid as data for this data type, so when we have `(define L1 (cons "Systematic" (cons "Design" empty)))` we say  `(cons "Systematic" (cons "Design" empty))` is `ListOfString` because `“Systematic”` is the string and  `(cons "Design" empty)` is `ListOfStrings`. Then we go deeper into  `(cons "Design" empty)` and we notice that the first part is a `String`, and the second is `empty`, which is an acceptable type of `ListOfString`, and therefore we can replace it.



```
#;
(define (fn-for-los los)
  (cond [(empty? los) (...)]
        [else
         (... (first los)     
              (fn-for-los (rest los)))]))

;; Template rules used:
;;  - one of: 2 cases
;;  - atomic distinct: empty
;;  - compound: (cons String ListOfString)
```

Since we are dealing with compound data, we go for cond to check each possible case. The first case is the primitive, so we check for that and do some work if that is the case, tht as I said before, involves returning something without re-running the function. It’s one of the control mechanisms that enables us to have a recursion function without becoming circular and therefore forcing a stack overflow.

The second case -if it’s not the primitive- means we are dealing with the list. So in the else we have `(... (first los) (fn-for-los (rest-los)))` which means, we first do some operation on the first element of the list, if we need to continue, we go to `(fn-for-lo (rest los))` which is the recursive call, so we are running the whole function again with what was left of the list (without the head, or first element) and run until the end (reach empty or some earlier return).

```
;; ListOfString -> Boolean
;; produce true if los includes "UBC"
(check-expect (contains-ubc? empty) false)
(check-expect (contains-ubc? (cons "McGill" empty)) false)
(check-expect (contains-ubc? (cons "UBC" empty)) true)
(check-expect (contains-ubc? (cons "McGill" (cons "UBC" empty))) true)

;(define (contains-ubc? los) false) ;stub

(define (contains-ubc? los)
  (cond [(empty? los) false]
        [else
         (if (string=? (first los) "UBC")
             true
             (contains-ubc? (rest los)))]))
```

In the implementation we see that we check for the primitive first (if it is empty), then we check if the first element of the list matches what we are looking for (UBC), if that is the case, we return true, if not, then we run the function again passing as a value the list without the first element we already checked (we do that using `(rest los)`).

As explained before, the list will be smaller and smaller until either we return true (so UBC is found) or until we reach empty, and therefore we return false.

## Javascript Bonus

After playing with the function above, I decided to translate it to JS and my fir approach was something like this:

```javascript
Const hasUBC = (array) => {
    if (array.length === 0) return false;
    if (array[0] === ‘UBC’) return true;
    array.shift();
    hasUBC(array);
}
```
To my surprise I was getting constantly `undefined`. I’m sure for a lot of you it is obvious, but I think it was the first time that I wrote a recursive function on JS with a returning value (before I used one that operated on the DOM so it was essentially an impure function).

Well anyway, the fix for the function is quite straightforward and is this:

```javascript
Const hasUBC = (array) => {
    if (array.length === 0) return false;
    if (array[0] === ‘UBC’) return true;
    array.shift();
    return hasUBC(array);
}
```

Why? Let’s think about it, if I don’t make an early exit, my new function call (recursive one) stacks on top of the original function call. This can happen multiple times, so when I do get a return, that is the return for that particular function in the stack, not for my original call. My original call is doomed to always return undefined because it has no return keyword (unless I get an early exit as I said). Since I tried to “translate” directly from Racket to Javascript I overlooked that part because Racket doesn’t use an explicit `return` keyword, every function call is an expression (at least so far I’ve gotten with the language).

So that is why you have to add a return statement to your recursive function call, because you want to have a hold and return whatever value eventually comes back from that long stack. Perhaps it seems obvious, but I didn’t know that before, and that is great, because I continue to learn.

That was all, until the next blog post!
