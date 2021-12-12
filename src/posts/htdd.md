---
title: How to Design Data
date: "2021-12-12"
---

As Gregor Kiczales says **“Design is the process of going from a poorly formed problem to a well structured solution.”** An important part of designing a program is to design the data, the decisions we make at this stage will later affect the following functions that operate on that data. In this post I will make a small introduction about data in programs, later will show the recipe to design the data, and finally show some examples.

## Data Definition

In any program we have the **problem domain** which is a reference to the real world, something that we want to model or represent in a **program**. Imagine we want to create a program that simulates the traffic lights. We have some information about this problem domain, such as that there are three different colored lights that change automatically. Now, how are we representing that information in our program? We don’t have colored lights, we have data. So we need to **represent** this information with data (for instance red light is represented with the number 0, yellow light with 1, and green with 2). By the same token, we are then able to **interpret** the data to understand what information is giving us.

With that in mind, we can establish that the first step to design data is to… well, do a data definition. Let’s continue with the Traffic Light. So we know we want to model the lights, so we write something like this:

```lisp
;; Data definitions:

;; TLColor is one of:
;; - 0
;; - 1
;; - 2

;; interp. Color of a traffic light - 0 is red, 1 is yellow, 2 is green.
```

A data definition, such as TLColor, is a bit like defining an interface in typescript. Before we consume this piece of data that represents some information from the problem domain, we map out how the data will look like and what it represents.

What we are doing with TLColor is similar to making a type definition. This is important because in our signature we can understand that if a function is working with TLColor, it will not receive any given integer, but a very specific subset, namely either 0, 1 or 2.

## Data Driven Templates

So we have our example (a data definition and interpretation) and the next step is to write template of a function that would use that data, something like this:

```lisp
(define (fn-for-tlcolor color)
  (cond [(= color 0) (...)]
            [(= color 1) (...)]
            [(= color 2) (...)))]
```

The interesting part in the HtDD recipe, is that the way we build the template depends on the classification of the data. At this stage we work with three different type of data: 

1. Atomic Non-Distinct
2. Atomic Distinct
3. One Of

Let’s break them down:

### Atomic Non-Distinct

Is the data type we are using is a Number, String, Boolean, Image or interval (like Number[0, 10). That is the “atomic” data part, meaning that you can’t take it apart into pieces that are still meaningful for the problem domain. A quick example is:

```lisp
;; CityName is String
;; Interp. The name of a city

; Examples
(define CN1 “Boston”)
(define CN2 “Vancouver”)

; Templates
(define (fn-for-city-name cn)
(...cn))

;; Template rules used:
;; atomic non-distinct: String
```
If our piece of data is a City Name, the atomic data is string, what about the non-distinct? Well, we know a city name will be a string, but we don’t know all possible city names, so we can assume it could be anything (imagine a “favorite number” data type, possibilities are infinite… literally). The template is straightforward, we just do something with that value.

### Atomic Distinct

As opposed to atomic non-distinct, atomic distinct is when we have an atomic data type, but we are expecting a specific subset, for instance, "red", false, empty etc. Not much to add here, besides that in the template we will probably will be looking for specific values  like `string=? value “red”` 

### One Of

Here it gets tricky, because we are stating that our data type is “one of” a list of things.  Let us start with enumeration.
Enumeration works with a fixed number of distinct values. For example, we want to define the possible grades (like A, B, C, D, E, F in the American system). We have a list of not any value, but defined ones (just like in our TLColor example, we only had 0, 1 and 2).

Just as we saw with TLColor, a function for **enumeration**:

```lisp
(define (fn-for-tlcolor color)
  (cond [(= color 0) (...)]
            [(= color 1) (...)]
            [(= color 2) (...)))]
```

We will use a cond (which is basically a switch statement if you are familiar with Javascript) and do something based on the value received. Easy peasy.

The second in “one of” is a bit more tricky, and is called itemization. We use itemization instead of enumeration when we have: Two or more subclasses, and at least one is not atomic distinct. I will add an example and break it apart:

```lisp
;; Countdown is one of:
;;  - false
;;  - Natural[1, 10]
;;  - "complete"
;; interp.
;;    false           means countdown has not yet started
;;    Natural[1, 10]  means countdown is running and how many seconds left
;;    "complete"      means countdown is over
(define CD1 false)
(define CD2 10)          ;just started running
(define CD3  1)          ;almost over
(define CD4 "complete")
#;
(define (fn-for-countdown c)
  (cond [(false? c) (...)]
        [(and (number? c) (<= 1 c) (<= c 10)) (... c)]
        [else (...)]))

;; Template rules used:
;;  - one of: 3 cases
;;  - atomic distinct: false
;;  - atomic non-distinct: Natural[1, 10]
;;  - atomic distinct: "complete"
```

This is a data type that has 3 possible states, either the countdown hasn’t started, which is represented with a boolean (atomic distinct false), the countdown is going on, which is represented with an interval (atomic non-distinct: Natural[1, 10] and with a string (atomic distinct, complete). 
Here we see some interesting things in the template, such as the use of guards for data types, like in `[(and (number? c) (<= 1 c) (<= c 10)) (... c)]` we check that the value is a number before trying to perform number-like operations on the value, like `<=`. We always list the template rules we used at the end.

## All of this in short

Basically when we want to work with an specific type of data, we must:

1. A type comment that defines the new type name and describes how to form data of that type.
2. An interpretation that describes the correspondance between information (problem domain) and data (program).
3. One or more examples of the data.
4. A template for a 1 argument function operating on data of this type.
 
## Main Takeaways of the week

At the beginning I was thrown off by all of these seemingly exotic definitions (atomic non-distinctive, itemization etc.) but I thinkI get the main value out of it. As it has been stressed out during the course:  *design is about going from ill formed problems to well structured solutions.* In that regard, the HtDD recipe is useful, because “once we identify the structure of the information, the inherent structure of the information, hat gives us the structure of the data used to represent it, which gives us the structure of the template” this helps us later to structure our function that uses this data type (template in that case are really useful), and we also get a better ideas on how to fully test our function.

On a broader scope, I think this week I was able to reflect on the value of modeling data appropriately, and understand how to work with it in the program. Extracting information from the problem domain and creating a solid representation of it through data is cumberstone in software development. I think I still need to fully absorb some aspects of what I learnt this week, but I will continue to revisit my notes to make sure that the main ideas sink in. Next week HtDW or “How to Design Worlds”.
