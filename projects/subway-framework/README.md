# Subway Angular Framework

This is a set of custom Angular 7 components to easy the development of any Subway frontend project.

## Installation
### NPM

Run `npm i @lucasferreiralsf/angular-frontend-framework`

### YARN

Run `yarn add @lucasferreiralsf/angular-frontend-framework`

## Usage

### Import SubwayFrameworkModule in app.module

```ts
import { SubwayFrameworkModule } from '@lucasferreiralsf/angular-frontend-framework';


@NgModule({
  imports: [
    // ...
    SubwayFrameworkModule
  ]
})
```
### Import the main css in your root scss file.

```scss
/* You can add global styles to this file, and also import other style files */
@import '../node_modules/@lucasferreiralsf/angular-frontend-framework/assets/styles/includes';
```
