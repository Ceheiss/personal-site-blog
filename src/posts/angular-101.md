---
title: Getting started with Angular
date: "2021-04-30"
---
 
Have you never used Angular before? Good, me neither, well I'm joking... sort of. The thing is that I recently started learning Angular and decided that it would be interesting to share my learnings in my blog. Today's agenda is extremely simple: Start an application in Angular, understand what a component is, and how to create components.
 
### Starting a new application
 
Starting a new application in Angular is very straight forward. First thing you have to do is install Angular's cli in your terminal like this:
 
```
npm install -g @angular/cli
```
 
The cli stands for Command Line Interface, and is a nice program that will help you build applications in Angular with ease.
Once the cli is ready, go to a folder where you want to create your angular app and type:
 
```
ng new the-name-of-your-app
```
 
If you are familiar with React, this is similar to create-react-app. If you are not, this basically will generate a new project with a ton of initial configuration and structure already done for you. So the app is ready and to run it you simply need to be in the root of your new application and run this in the command line:
 
```
ng serve
```
 
Just like that, you open your browser and go to `localhost:4200` and you can see your new application with the default message. Great we are done! Well, not quite, we haven't written any code and we only have one component inside the `src` folder and we haven't even written it. Let's talk a little bit about components before we do that.
 
### Components
 
Main brick that build Angular houses is called a component. Components in Angular live inside modules, which in short usually represent a feature in the application. Let's break down first the anatomy of a component. A component is composed, usually, of three files, four if you consider the `spec` file where the tests live (and you should, test your apps, it's good practice). The most important file is a Typescript one, there is where the component is defined. At the end of the day, the component is simply a TS class, enough chating, lets build one.
 
Create a folder called `square` (terrible name honestly), and inside create three files: `square.component.ts`, `square.component.html`, and `square.component.css`. A barebones TS file of this sort would look like this:
 
```javascript
import { Component } from '@angular/core'
 
@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.css']
})
 
export class SquareComponent {
}
```
 
Let's break this down. First we import from Angular "Component", and the strange syntax with the **@** sign is called a decorator. `@Component` is a way to tell Angular that `SquareComponent` is not any class, but a component. To the decorator we pass an object literal with some metadata. The `selector` is the way we are going to actually instantiate our component in a template, and we will do so pretty much like an html tag, like `<app-server>`. `templateUrl` will point to the template file of the component, where we write the html (you can also add inline html, but we are not doing that). Finally `styleUrls` is an array where we point to the stylesheet for the component. Simple. In this post we are not doing anything yet with data binding (that comes next) so the class will be left out empty. As a teaser, in the class is where we can hold some state of the component, define properties we can later display in the template, and also define methods we can also run in the template among other things, but more on that later.
 
Just for fun we can go the template an write:
```html
<h3>I'm a Red Square</h3>
<div class="red-square"></div>
```
 
and in the css file:
```css
.red-square {
 background: red;
 width: 200px;
 height: 200px;
}
```
 
### Wiring the component
 
Our component is ready but not yet finished. Before we can do anything with it we need to wire it to the parent module, in this case `app.module`. Angular uses components as building blocks, and uses modules to sort of bundle them together. The module gives Angular the information about which features it has and can use.
 
So this is our parent module:
 
```javascript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
 
@NgModule({
declarations: [
  AppComponent
],
imports: [
  BrowserModule
],
providers: [],
bootstrap: [AppComponent]
})
export class AppModule { }
```
 
Because we added a new component (red square) we need to "register" it so Angular knows it exists. To do it we first import it, and the add it to the declarations array like this:
 
```javascript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { SquareComponent } from './square/square.component';
 
@NgModule({
declarations: [
  AppComponent,
  SquareComponent
],
imports: [
  BrowserModule
],
providers: [],
bootstrap: [AppComponent]
})
export class AppModule { }
```
 
*Voila*, know the last part. We go to the app component (the root app of this application), and in its template file we use insert `<app-square>`. Now we can check, and the output should be there, with our nice 200 pixels long red square. If you remember, is in the decorator of the square component where we defined the name of the selector that we used.
 
Now, two news, the first one is that we are done. That is how you create and wire a component by hand. The second news? We could actually do this automatically by virtue of the CLI. We basically have to run `ng generate component <component-name>` and everything will be generated (the folder, the four files inside of it) and also the component will be registered. Nothing left to do. Don't want to type too much? `ng g c <component-name>` would do just the same.
 
Alright, so there you have it. That is the very basics of Angular. Next we will explore **data-binding** how to display dynamically properties in the template, and how to change the state of the component based on user interactions. Until the next one!