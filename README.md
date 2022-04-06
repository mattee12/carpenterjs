# CarpenterJS
A JS library for building websites.

## Usage
### 1. Add the library to your HTML header:
```
<script src="https://mattee.net/scripts/carpenter.js">
```
### 2. Create scripts/init.js:
```
//Importing an example module.
loadScripts(["util/strings"]);

//This is called when every module is loaded. Make this the entry
//point of your code, to make sure they are ready to use.
registerWaitingForScripts(function(){
    //Example function from util/strings.
    console.log(capitalizeEveryEvenCharacter("hello world"));
    //Output: hElLo wOrLd
});
```
