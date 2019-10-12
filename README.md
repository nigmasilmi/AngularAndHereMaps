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

To achive the functionality, I have built by @baby steps@ in order to familiarize with Here Maps (C) and its integration in Angular 8.

The evolution can be checked in the master branch commits of this repository.

### Getting to Know DOM References

In order to integrate the UI as a whole, in an Angular environment, we must use some Angular core Classes and Interfaces.

ViewChild: allows to manipulate DOM native elements, its plural counterpart being ViewChildren. Works as a decorator that provides metadata for the properties of a component's class. If we need to query for a (or several) DOM element, we must use one of this classes.

But what if we want to go deeper than requesting the element or elements? what if we want to access the elements' properties and methods? That is why we must use:

ElementRef: wraps a native DOM elements and exposes all of their attributes and methods, making them available for manipulating as dynamic part of the UI.


#### Evolving: lets render my hometown in the map
1. Let's skip the Angular/CLI installation and the Angular App initialization (I'm sure you can figure that out already)
2. In index.html we need to referenc the core and service libraries from Here Maps. Make sure it is near the end of the html body, we want to make sure that the main structure is loaded before we do anything else (maybe we need more than this, but later).
3. Include in the main component a <div> element that sets the place for the map rendering. We need to "mark it" with a 'kindof' id, that is not such but a way to identify it in a Angular-compatible way (#map).
4. "First comes the #map, then comes the logic". Now lets tell the main component what to do: import the required Angular/core classes (other that the already and kindly imported by the CLI): ViewChild & ElementRef.
5. Create an external-to-the-class property named "H" of the type "any". This will help us calling the Here API implemenmtation. Wait and see...but first we must use the reserved keyword "declare" why? because H is not defined per se in our app, it is defined somewhere else (HERE API), and we must notice that to our code.
6. For the class properties, we must declare: platform, mapElement. The former will serve as part of the API implementation and the later as the logic handle of our DOM element of interest.
7. Platform must be type of "any" and mapElement must be identified with the "idish" indicator we have set in the view. As in Angular 8, @ViewChild receives one additional parameter, type of object and its property value a boolean, if it is true means "wait untill the queries are answered before rendering this element"...why you say? because what if we need to show a result as an element for the DOM? we must get this result first in order to show it in the view.
8. In the Class constructor we call the Here platform service so it can be available when the component is rendered, this must be in conjunction with our own app ID and API Key.
9. As part of a class method we must implement ngAfterViewInit (method) that is part of the imported Interface AfterViewInit. And what role does ngAfterViewInit play? Ensures that whatever code block is inside of this method, must be executed only when the view has been initialized. Hey, make sure that you implement it in the class itself, otherwise, TSLint won't let you sleep.
10. What is that "so-important" block code that must be wrapped in ngAfterViewInit? The heart and soul of the API: its default layers, and the code that is needed to render the map in a specific location with a defined zoom and the center in the rendered view, AKA our mapElement.
11. ngserve that! 
This is [the result](https://res.cloudinary.com/dz3gm9c3w/image/upload/v1570672610/mapHometown_lnelqz.png)

#### Evolving: lets make it useful Part 1
So, at this moment we are suscribed to see just one location in the map but no more than that. What if we want to point some place else in the map, or, beyond that, we want to make the component useful for another siblings in the app?
Then, we create a customizable component with DOM binding properties.
1. Import the required modules, same as the first render,  plus the Input module. And what does Input Module do? It is a decorator that sets a class property to an input field and to a DOM property, also,  as decorator provides metadata. We can bind parent to child inputs by setting inside the parent, the tag selector of the child and the binding target. '<parent><child [inputProperty]="someValueFromTheParentView"></child></parent>'
2. Create input-decorated properties in the customizable component and bind the properties with specified values. Let's create two elements with the customizable selector in the app.component.html to show the differences by setting specific properties for each element.
This is [the result](https://res.cloudinary.com/dz3gm9c3w/image/upload/v1570754487/mapHometown2_ifzxwt.png)


#### Evolving: lets make it useful Part 2


We want to show markers in the map that corresponds to places, requested by string queries, why? to get nearer the aim of the app, using some tutorials as learning resources and then extrapolate the functionality to the desired MVP.

As an approach to gradually understand the integration Angular/Here, let´s explore some interaction. What do we need for interactions? Events and listeners, that is why we must link the UI, Events library of Here.

As class properties, these will be ui and search.


1. We will use the Places(Search) API from Here Maps, with which we can -among other things- search a place by a 'text string search', it returns an array with the possible matches, each one being an object with the properties: title, category, type, etc. A request is constructed by Base URL/Path/Resource/AppId/AppCode. To perform a search we will use the low level access service H.service.PlacesService and its method request, that receives entry point and entry point parameters. This service will be available at ngOnInit lifecycle hook because it not dependant on the ui, just the service, then we will pass the arguments.

2. As I mentioned earlier, the interaction is successful if there is an event and a listener, meaning some behavior user-app, for that we will use the class H.mapevents.Behavior that encapsulates events and functionality. This depends on the readyness of the ui, that is why we will use it in the ngAfterViewInit hook, and also H.ui.UI.createDefault that will be the user interaction interface instantiation.

3. Let's render a map with the center being México city, and then input a string to request places in Mexico. In this case I'm showing the result of querying for "fonda".
This is [the result](https://res.cloudinary.com/dz3gm9c3w/image/upload/v1570841586/fonda_za899d.png)

But, wait, How does this code works? it will be better to visually explain it:
 [Click here](https://res.cloudinary.com/dz3gm9c3w/image/upload/v1570890752/VisualCodeExplanation-01_rvmtl7.jpg)



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
