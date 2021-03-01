# RelativeTimeline

A simple demo for history timeline view created with [Angular CLI](https://github.com/angular/angular-cli) version 10.1.4

## Table of contents

* [General Info](README.md###General-info)
* [Demo](README.md###Demo)
* [Technologies](README.md###Technologies)
* [Setup](README.md###Setup)

### General info

* This timeline view allows dynamic height container calculated on viewport resize
* This timeline doensn't need fixed height for its items
* It doesn't need the amount of items fetched, because it calculates them based on the array.length in response
* This timeline has 3 different layouts: left | alternate-left | alternate-right
* This timeline allows dynamic templates for the item, you have to pass a component ref and an injector in the timeline data model
* This timeline supports infinite-scroll
* This projects includes a simple sketch for theming the app and theming the timeline too

### Demo

https://user-images.githubusercontent.com/16958658/109535707-27cbb000-7abd-11eb-848f-1dded47692dc.mp4


### Technologies

This projects is created with [Angular CLI](https://github.com/angular/angular-cli) version 10.1.4
It also include a library _timeline_ under _projects_ generated and buildable with [ng-packagr](https://github.com/ng-packagr)

### Setup

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.



