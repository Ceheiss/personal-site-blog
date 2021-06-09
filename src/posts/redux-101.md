---
title: Explain me Redux like I’m Five
date: "2021-06-09"
---

*I found this blog post that I wrote... perhaps a year ago? I forgot a lot about Redux since I haven't used it since, so it was pretty cool to read it again as a refresher.*

![](https://redux.js.org/img/redux-logo-landscape.png)

To start, we have a high level idea that Redux is created to manage state. Everything state related thing that is displayed in the app (or most of it) is handled by Redux. With that in mind, let’s think of the most important parts.

Whenever we want to make a change to the app, we want to perform an action. **An action in Redux is a JS object composed of two things: a type, that explains WHAT I want to do, and a payload that provides relevant information to perform said action**.

```javascript
{
   type: ‘ADD_NAME’,
   payload: { name: ‘GIlbert’  }
}
```

Now, actions are not created out of thin air. They are made with some special functions called **action creators**. Action creators are very simple functions, they just take some arguments and return the before described action. So cool, we know we can use actions to change state in our application, and how to create them, but how are they processed?

```javascript
const addName = (name) => { 
   return {
        type: ‘ADD_NAME’,
        payload: { name }
    }
}
```

For that we got reducers. Reducers are functions that actually do the work, but how do they do it? They receive the state of the app and an action as arguments. They check the action type (WHAT you want to do) and if they are the appropriate reducer, they proceed to handle it.

```javascript
// reducers
const manageNameReducer = (state = [], action) => {
  if (action.type === 'ADD_NAME') {
    return [...state, action.payload.name]
  } else if (action.type === 'DELETE_NAME') {
    return state.filter(name => name !== action.payload.name)
  }
  return state;
}
```

Now, very important is to remember that the **end goal is to update state**, so the reducer usually performs an operation using the given state and the information passed in the payload of the action. **The returned value of the reducer is the updated state**.

OK, so far so good. Now, we will usually have more than one reducer. When we finish writing the action creators and reducers, we combine all reducers. How do we go about that? Well, now we actually start using the redux library (everything we have written before is just JS). We use the `combineReducers` method and provide it an object with all the reducers.

```javascript
const reducers = combineReducers( { manageNameReducer } );
```

Now we create our store, **the store is the single place of truth. It will hold the state and through some methods, will be able to modify the state**. How do we create it? We use the `createStore` redux method and we pass the reducers as argument, easy:

```javascript
const store = createStore(reducers);
```

Now we have a store, and we can start doing some things. For example, I might want to create a person, for that I use the dispatch method and pass the action as an argument like this:

```javascript
store.dispatch(addName(‘Will’));
```

Let us stop for a second and think of what is actually going on. **Dispatch**, as it names says, **is like a courier or mailman that takes an action an delivers it** (remember that our **addName is an action creator, therefore returns an action**). Behind the scenes Redux will check in our reducers whether any of them knows how to handle this action (so it will check the action type) and since we defined in them what to do, they will operate and return the new state.

How do we check if this worked? The store object has several functions that might be useful, one of them `store.getState();` we can `console.log` that and ‘Will’ should be available in the state. 

So that is bare bones Redux in simple terms. **We have actions, created by action creators, and reducers that handle those actions and return the new state. We combine those reducers and pass them as an argument to createStore to well… create a store (naming for the win) and with a store we have access to functions to update our state, or just read it among other things.** Neat right? 

Next up, is how we can use Redux with yet another library called React-Redux to… yes you guessed it, make life easier when using both libraries together.

ps: [Here is a super simple demo app doing a todo list with redux](https://github.com/Ceheiss/redux-todo-app)