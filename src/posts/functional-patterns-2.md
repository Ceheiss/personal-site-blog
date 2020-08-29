---
title: Functional Programming 101. Immutable Data, Arrays
date: "2019-12-18"
---

Last blog post I talked about how an application is just data that is displayed in a meaningful way and that often we can interact with that data through an interface. This is relevant because in one hand we do things with the data (like **C**reating, **R**eading, **U**pdating, and **D**eleting it), but in the other, functional programming tells us not to mutate data. Last post we talked how we go about it with objects, and today we do it with arrays.

In my opinion, when we are talking about arrays is a bit more simpler than objects (yes, arrays are objects as well, but I'm talking about {objects}). The reason is that we have a group of nice array methods that do this for us, each of them returns an array, so immutability is simple. Let's take a look.

Firstly, to make a copy of an array without copying the reference (just the values) we can do it just like we learned in the object, that is:

```javascript
const originalArray = [1, 2, 3]
const copyOfOriginal = [...originalArray]
```

We use the spread operator to unpack the values of `originalArray`. To unpack them we need a receiver, in this case is the brackets `[]`, so each element will be unpacked inside an array (I could have done `const copyOfOriginal = {...originalArray}` and unpack the elements in an object that would look like this: `{0: 1, 1: 2, 2: 3}`). Only iterable values can be unpacked (so strings, iterable objects, node lists, arrays, and similar things).

As an overview, we could copy the array using rest:

```javascript
const originalArray = [1, 2, 3]
const [...copyOfOriginal] = originalArray
```

Here we are collecting all the elements of `originalArray` in `copyOfOriginal` and storing them as an array. Well, enough of that. Let's get to CRUD.

### Adding

Add something to the array is super simple, works just like in an object:

```javascript
const originalArray = [1, 2, 3]
const arrayWithNewValue = [...originalArray, 4]
```

So we are just unpacking the elements of the array on a new one, and adding a new value. Sure, couldn't we just use `originalArray.push(4)`? but that is mutating, so it's a "No No".

### Updating

Updating values is simple enough: if we have an array of numbers, and for some reason we want the elements to be multiplied by two, we can do this:

```javascript
const originalArray = [1, 2, 3]
const doubledArray = originalArray.map(num => num * 2)
```

That will return an array like this: `[2,4,6]`

Map is a method of the Array object. It takes a function where you provide something to identify each element (`num` here) and then return the operation to that element. Map returns a new array with all of those elements transformed. You can do much more with map, it also can show the index, and you can provide it an object for `this` to point to, but for the scope of this article, we are golden.

![](https://i.pinimg.com/originals/35/6d/a7/356da79e0ba47fdf8a5650dcea80ab7b.jpg)
_Yes, you heard that right, I said "golden"_

### Deleting

Deleting an element is very similar, it also uses an array method. The name is filter. Imaging you have an array of numbers and for some reason you want to delete any number that has more than one digit. You can do that like this:

```javascript
const originalArray = [1, 10, 8, 5, 14, 20, 2, 11]
const onlyOneDigitAllowedArray = originalArray.filter(num => num < 10)
```

With that, we should get an array like this: `[1, 8, 5, 2]`. As in map, we didn't touch `originalArray`, filter returns a new array, so we can delete elements without mutating anything.

### Wrap Up

So there we have it, how to **add**, **update**, and **delete** elements in objects and arrays in an immutable way. See you next time.
