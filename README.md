# HereWeGo

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.3.

## Deploy

Try this app by checking [its deploy](https://angular-and-heremaps.herokuapp.com/)


## Project Notes
Here I will document the concepts, meanings, definitions and logic needed for developing this app. May serve this as an aid for further references and also as a help for those who want to replicate and understand the logic behind this app.
This app is developed thanks to other developers that have taken the time and effort to share the applied documentation.
Some useful links are listed at the end of this file.

### The Aim

The main purpose is to show the locations of several mexican stores which data is contained in a JSON object.
The functionality must include adding favorites stores in a list, triggered by clicking on their map markers.

## Evolving

To achive the functionality, I have built by @baby steps@ in order to familiarize with Here We Go Maps (C) and its integration in Angular 8.

The evolution can be checked in the master commits of this repository.

### Getting to Know DOM References

In order to integrate the UI as a whole, in an Angular environment, we must use some Angular core Classes and Interfaces.

ViewChild: allows to manipulate DOM native elements, its plural counterpart being ViewChildren. Works as a decorator that provides metadata for the properties of a component's class. If we need to query for a (or several) DOM element, we must use one of this classes.

But what if we want to go deeper than requesting the element or elements? what if we want to access the elements' properties and methods? That is why we must use:

ElementRef: wraps a native DOM elements and exposes all of their attributes and methods, making them available for manipulating as dynamic part of the UI.


#### Evolving: lets render my hometown in the map
1. Let's skip the Angular/CLI installation and the Angular App initialization (I'm sure you can figure that out already)
2. In index.html we need to referenc the core and service libraries from Here Maps. Make sure it is near the end of the html body, we want to make sure that the main structure is loaded before we do anything else (maybe we need more than this, but later).
3. Include in the main component a <div> element that sets the place for the map rendering. We need to "mark it" with a 'kindof' id, that is not such but a way to identify it in a way Angular-compatible (#map).
4. "First comes the #map, then comes the logic". Now lets tell the main component what to do: import the required Angular/core classes (other that the already and kindly imported by the CLI): ViewChild & ElementRef.
5. Create an external-to-the-class property named "H" of the type "any". This will help us calling the Here API implemenmtation. Wait and see...but first we must use the reserved keyword "declare" why? because H is not defined per se in our app, it is defined somewhere else (HERE API), and we must notice that to our code.
6. For the class properties, we must declare: platform, mapElement. The former will serve as part of the API implementation and the later as the logic handle of our DOM element of interest.
7. Platform must be type of "any" and mapElement must be identified with the "idish" indicator we have set in the view. As in Angular 8, @ViewChild receives one additional parameter, type of object and its property value a boolean, if it is true means "wait untill the queries are answered before rendering this element"...why you say? because what if we need to show a result as an element for the DOM? we must get this result first in order to show it in the view.
8. In the Class constructor we call the Here platform service so it can be available when the component is rendered, this must be in conjunction with our own app ID and API Key.
9. As part of a class method we must implement ngAfeterViewInit (method) that is part of the imported Interface AfterViewInit. And what role does ngAfterViewInit play? Ensures that whatever code block is inside of this method, must be executed only when the view has been initialized. Hey, make sure that you implement it in the class itself, otherwise, TSLint won't let you sleep.
10. What is that "so-important" block code that must be wrapped in ngAfterViewInit? The heart and soul of the API: its default layers, and the code that is needed to render the map in a specific location with a defined zoom and the center in the rendered view, AKA our mapElement.
11. ngserve that! 
This is [the result](https://res.cloudinary.com/dz3gm9c3w/image/upload/v1570672610/mapHometown_lnelqz.png)



## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
