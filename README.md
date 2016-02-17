# generator-vss-angular2
Yeoman generator for Angular 2 based applications.

# known issues
### node_modules/angular2/src/facade/promise.d.ts(1,10): error TS2661: Cannot re-export name that is not defined in the module.
This is a [known bug](https://github.com/angular/angular/issues/6468) with 
the `src/facade/promise.d.ts` file that ships with Angular 2. It 
[can be fixed](https://github.com/angular/angular/issues/6468#issuecomment-176590156) by
adding the following snipped to the top of the `promise.d.ts` file:
```
declare var Promise: PromiseConstructor;
```