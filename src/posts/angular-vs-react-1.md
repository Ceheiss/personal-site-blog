---
title: Angular vs. React:\ Displaying Customized Components
date: "2021-06-11"
---

Angular and React are two of the biggest Javascript Frameworks around. Since I recently learned how to pass properties from parent to child component in Angular, I decided that it would be interesting two build one simple app (an app that displays cards with a name and an image) using both frameworks and walk through the different approaches they provide to solve the same problem. If you want to take look at the code, [here](https://github.com/Ceheiss/cards-angular-demo-app) is the repository for the Angular version, and [here](https://github.com/Ceheiss/cards-react-demo-app) for the React version. I deployed both instances, so if you want to look as well, [here](https://cards-angular-demo-app.vercel.app/) is the Angular, and [here](https://cards-react-demo-app.vercel.app/) the React one. Alright, enough propaedeutics. let's go!

![](https://www.freecodecamp.org/news/content/images/2019/10/react-vs-angular.png)

## Initial Setup

So the task that we have on hand is the following, we have an array of objects that hold names and image URLs, this is our data and it looks like this:

```javascript
const cardData = [
  {
    name: "Cecilioland",
    image:
      "https://images.unsplash.com/photo-1620679031965-78c27001de39?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&ixlib=rb-1.2.1&q=80&w=200",
  },
  {
    name: "Ludovico's place",
    image:
      "https://images.unsplash.com/photo-1623163688930-1652904cfc1a?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&ixlib=rb-1.2.1&q=80&w=200",
  }
  ...
```

We have the same structure in both applications, that is, an **app** component that displays multiple **card** components. We want each card component to display unique data based on what is coming from the `cardData` component. Alright, let's take a look at how we approach the issue in React first.

## React: passing data using props

Let's first take a look at the `App` component file:

```javascript
import "./App.css";
import Card from "./components/Card/Card";
import cardData from "./data/card-data";

function App() {
  return (
    <div className="cards">
      {cardData.map((card) => (
        <Card name={card.name} image={card.image} />
      ))}
    </div>
  );
}

export default App;
```

We import the card component and the card data (shown above). The nice thing about React, is that at the end of the day is just Javascript. JSX might look like HTML, but behind the `<h1>Hello</h1>` you right in a React file, what is happening is something like `React.createElement("h1", null, "Hello")`, we are calling a function that is generating a DOM element (a bit like [hyperscript](https://github.com/hyperhype/hyperscript), if you have played with it).

This fact is important, because when we want to display multiple elements what do we do? We use Javascript. In the case above we take the  `cardData` array and map through it. For each `card` object we generate a  component. We pass the properties using props, which means, we add the name of the data and the value that we get from the array, like `name={card.name}`(the curly braces is to use Javascript). Now let's look at the **Card** component:

```javascript
import React from "react";
import "./Card.css";

const Card = ({ name, image }) => {
  return (
    <div className="card">
      <h3>{name}</h3>
      <img src={image} alt="some random place" />
    </div>
  );
};

export default Card;
```

In React we use an object in the input of the function which is called props, through it, you can access the data that is passed from the parent. In this example, I decided to destructure the content on props because that is what cool kids do.

So there you go, that is how we can build components programmatically based on an array of data. Onwards to Angular.

## Angular: using the @Input decorator

In Angular, each component is based of multiple files. Most relevant ones is the TS file and the Template one. Here is the TS file for our App component:

```typescript
import { Component } from '@angular/core';
import { CARD_DATA } from './data/card-data';
import { CardData } from './model/CardData';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  cardData: CardData[] = CARD_DATA;
}
```

We see that we have the data, which is an array of the `CardData` type defined in an interface (Angular enforces the use of Typescript). By doing this, it means that App Component has access to the `cardData` array (therefore the information), and so we can use it in the template, that looks like this:

```html
<div class="cards">
  <app-card *ngFor="let card of cardData" [cardData]="card"></app-card>
</div>
```

The first thing to consider is that Angular uses a templating system, this means that we have different keywords to perform actions like looping through data, or conditionally displaying information among other functions. In the case above, we use the **structural directive** **ngFor* to loop through the `cardData` (note that the directive is applied in the same level of the component to iterate, as opposed to the parent like in React). We use the bracket notation (for inputs in Angular). We are passing the whole object from the array as `cardData` to the card component. Cool, let's see how the Card component looks:

So the template for the card component is quite straightforward, looks like this:

```html
<div class="card">
  <h3>{{cardData.name}}</h3>
  <img [src]="cardData.image"/>
</div>
```

Remember we pass the whole object? We access the values using dot notation and add it to the template with data binding. Now let us take a look at the typescript file:

```typescript
import { Component, Input, OnInit } from '@angular/core';
import { CardData } from '../model/CardData';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input()
  cardData: CardData
}
```

So the interesting part here, is that for Angular to use the data that is passed from the parent component, we need to use the `Input` decorator. In the file, we are calling it and defining the type of data that we expect to receive (CardType was defined in an interface as explained before). The input decorator is a way of saying, "I'm declaring this property, I will use it in the template, but the value will come from a parent element, not from this component". And that is pretty much it. Mission accomplished, I won't bore you with the CSS, but I thank the gods for Flexbox.

## Takeaways

The exercise was extremely interesting for me, especially because I haven't touched React in months so it was nice to refresh. In general, I would say that Angular provides more separation of concerns in terms of having two files as opposed to one in React (although you could separate your logic as well in React should you choose to), so it can help to keep things tidy. React in my opinion is more straightforward because passing data to child components feels more natural than the decorator approach of Angular. Furthermore, I think I enjoy better the JSX approach than Angular templating, mainly because you use plain Javascript to get things done (looping, conditionally showing things, filtering data, etc.), as opposed to having to learn or remember template specific keywords and patterns. 

Next on the agenda is to continue growing this app. How do we handle data coming from an API in two different ways? (So we get to see the Dependency Injection in Angular), how do we pass data from child to parent? And so many more. But this blog post is quite long, and we will leave it at that for now. Thanks for reading!