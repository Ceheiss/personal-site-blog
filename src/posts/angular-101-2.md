---
title: Data Binding in Angular
date: "2021-05-02"
---

Qhat is Data-Binding? The concept seems difficult, but in reality is quite straightforward. In Angular context, data-binding is the communication between two pieces of code in the component: The TS file where the businnes logic lives, and the template (html). Sometimes we want to define something in the class and display it in the template dynamically, other times the user might click on a button or type something on a search bar, and we might want to trigger something in our code to react to that. For all of this, we need the event bindings.

In general we have four ways of doing this. As output, or from the TS file to the template we have two wazys, one is **string interpolation** and the other one is **property binding**. For reacting to some user interaction in the template (an event) we use **event binding**. Finally we have one that does both, and is appropiately named **two-way data binding**

### String Interpolation

String interpolation is pretty straightforward. We add some properties in our class:

```javascript
export class ServerComponent {
   serverID: number = 10;
   serverStatus: string = 'offline';
}
```

And later we have access to them in the template via curly braces:

```html
<p>The server with id {{serverID}} is {{serverStatus}}</p>
```

Inside the curly braces you can also add an expression (any expression that can resolve into a string at the end, it can even be a method call or a ternary).

Example:
```javascript
export class ServerComponent {
   serverID: number = 10;
   serverStatus: string = 'offline';
  
   getServerStatus() {
       return this.serverStatus;
   }
}
// In The template
<p>The server with id {{serverID}} is {{getServerStatus()}}</p>
```

### Property Binding

Square brackets indicate to Angular that we are doing property binding.

Here we are using it to set whether the button is disabled or not, based on a property (allowNewServers) defined in the class:

```html
<button class="btn btn-primary" [disabled]="!allowNewServers">
   Add Server
</button>
```

Above we can set an attribute of the html element based on a property defined in the TS file (`allowNewServers` is boolean stored as a property). This are the two moments where we are communicating something from our TS file to the template.


### Event Binding

Prefixing methods with “on” indicated that the action is going to be performed by the user.
The way of showing that we are using event binding is by using parenthesis.

<button
   class="btn btn-primary"
   [disabled]="!allowNewServers"
   (click)="onCreateServer()">
   Add Server
</button>
<p>{{ serverCreationStatus }}</p>

The dollar sign event, is a reserved word that gives us access to the event data (the object).

<label>Server Name</label>
<input
   type="text"
   class="form-control"
   (input)="onUpdateServerName($event)">
 
<button
   class="btn btn-primary"
   [disabled]="!allowNewServers"
   (click)="onCreateServer()">
   Add Server
</button>
<p>{{ serverCreationStatus }}</p>
 

On the TS file I can add this,:

 onUpdateServerName(event: any) {
   // This shows me all the info passed
   console.log(event)
 }
