---
title: How to Design Functions 1a
date: "2021-12-03"
---

I recently started the course ["How to Code: Simple Data" Introduction to Systematic Program Design](https://www.edx.org/course/how-to-code-simple-data) By Gregor Kiczales on Coursera. The idea of the course is to teach a systematic approach to solving problems (often poorly defined ones) by means of using some recipes (these recipes start with how to define functions, later how to design data, and so on).

The course is heavily guided by the book ["How to Design Programs"](https://htdp.org/), and in order to focus more on the process and not so much on the implementation, the chosen language of instruction is BSL (Basic Student Language) which is a language that resemble Scheme quite a bit (so if you are familiar with any Lisp variant, you will be right at home).

The whole course is divided into 6 weeks (plus 1 for the final project), so my idea is to write a weekly report in the form of a blog post, sharing my learnings (mainly with my future self), and some insights about the material I have been exposed to.

### How BSL works

As any programming language, BSL evaluates expressions and produces values. The syntax for doing this might be strange at first. In Javascript for instance, we usually follow this format `someFunction(functionParameter)` if we are doing something mathy we might have an infix notation, like `1+1`.

BSL has a different approach, it uses `(<primitive operator> <expression>)` basically without exception, so we are looking at expressions like this> `(+ 2 2)` or `(string-length "hello")`. We often see as well nested expressions, like:
`(sqrt (+ (sqr 3) (sqr 4)))` for the Pythagorean Theorem. So we square root (`sqrt`) the sum (`+`) of the sides of the triangle (`(sqr 3)` and `(sqr 4)`).

With this in mind it is important to understand how that code is evaluated.
Imagine we have this expression: `(+ 2 (* 3 4) (- (+ 1 2) 3))`.

Racket (where we run this code) will know is a primitive call because of the parenthesis followed by the operator (+ in this case). The way it proceeds is by first reducing operands to values, and later applying the primitive to the values. For instance, `+` goes to `2`, is a value so we are good, then the next operand is `(* 3 4)` that is an expression, so it tries to resolve it. `*` goes to `3` which is a value, then to `4`, which is a value, so then it reduces the expression to `12`. Next expression is `(- (+ 1 2) 3)` the process is repeated (and is recursive, as we showed). Finally when we only have values, the outermost primitive is applied to all those values to reduce the big expression to a single value.

```lisp
(+ 2 (* 3 4) (- (+ 1 2) 3))
(+ 2 12      (- (+ 1 2) 3))
(+ 2 12      (- 3       3))
(+ 2 12      0)
14
```

Besides numbers we have other data types (with their own primitive operators), like string `(string-append "hello " "world")` or `(string-length "Ada Lovelace)`. If we import some libraries (like _2htdp/image_) we can also work with images with ease. We can create them `(circle 10 "solid" "red")` or get values from it `(image-height some-image)`.

### Defining constants and functions

Defining constants, or variables is quite straightforward. We use the primitive `define` followed by a name/label and a value. So what in JS would look like `const width = 45` in BSL would be `(define WIDTH 45)`. Of course, later we can use the constants as values `(* WIDTH HEIGHT)`.

Defining functions is quite similar. We also use the `define` primitive, but instead of providing a name directly, we open parenthesis and inside the parenthesis we add the function value followed by the parameters. I lost you there? Here is an example.

In JS it would be like:

```javascript
const multiplyByTwo = number => number * 2
```

While in BSL is:

```lisp
(define (multiply-by-two number)
(* 2 number))
```

### Booleans and IF Expressions

`=, >=, >, <, <=` are called predicates, predicates are primitives or functions that produce a boolean value. Those are not the only ones, some are strictly for strings, like `(string=? "Foo" "Bar")` which returns false.

If statements on BSL have the following format:

```lisp
(if <expression>  --> Question (that produces a boolean)
   <expression>  --> true answer
   <expression>) --> false answer
```

This works very much like a ternary in JS, so what in Javascript would be:

```javascript
const answer = "hello" === "world" ? "equal" : "not equal"
```

in BSL is:

```lisp
(if (string=? "hello" "world")
   "equal"
   "not equal")
```

Alright, that was quite some information, so next is the interesting part of the first week. How do we design functions?
