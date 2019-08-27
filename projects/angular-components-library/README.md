# Subway Angular Components Library

This is a set of custom Angular 7 components to easy the development of any Subway frontend project.

## Installation
### NPM

Run `npm i @lucasferreiralsf/angular-frontend-library`

### YARN

Run `yarn add @lucasferreiralsf/angular-frontend-library`

## Usage

### Import SubwayComponentsLibraryModule in app.module

```ts
import { SubwayComponentsLibraryModule } from '@lucasferreiralsf/angular-frontend-library';


@NgModule({
  imports: [
    // ...
    SubwayComponentsLibraryModule
  ]
})
```
### Import the main css in your root scss file.

```scss
/* You can add global styles to this file, and also import other style files */
@import '../node_modules/@lucasferreiralsf/angular-frontend-library/assets/styles/includes';
```
