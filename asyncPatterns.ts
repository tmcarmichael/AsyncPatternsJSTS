/*
  Asynchronous JavaScript -- common patterns and examples

  When refactoring old JS code, it's often useful to use async/await to simplify the code. This sidesteps many issues with callbacks or then chains and makes the code easier to read. However, sometimes changing a function to be 'async' to use 'await' can cause issues with the return type. For instance, an async function must return a Promise.

  I've run into enough issues with race conditions and JS promises that I'm creating this to document to show some of the common patterns and examples that are useful in refactoring old code. Hopefully this will help others who are refactoring old code. I'll be iterating on this as I run into more patterns and ideas.

  There's roughly three main ways to handle asynchronous code in JavaScript. In chronological order from their release/use:

  Instructions:
  - Uncomment/comment methods in the IIFE at the bottom.
  - Run instructions with TypeScript:
    - `tsc asyncPatterns.ts`
    - `node asyncPatterns.js`
*/

// First, callbacks. This used to be the most common way to handle asynchronous code in JS. It's also the most verbose and error prone. You'll encounter this pattern a lot in old code.

function funcOne(callback: (name: string) => void): void {
  fetch("https://pokeapi.co/api/v2/ability/1")
    .then((response) => response.json())
    .then((data) => callback(data.name));
}

function funcTwo(callback: (name: string) => void): void {
  fetch("https://pokeapi.co/api/v2/ability/2")
    .then((response) => response.json())
    .then((data) => callback(data.name));
}

function funcThree(callback: (name: string) => void): void {
  fetch("https://pokeapi.co/api/v2/ability/3")
    .then((response) => response.json())
    .then((data) => callback(data.name));
}

function callbackMethod(): void {
  console.log("callbackMethod() called");
  funcOne((name) => console.log(name));
  funcTwo((name) => console.log(name));
  funcThree((name) => console.log(name));
}

// But what if you wanted to use the returned values from the callbacks before the main thread continues to execute other code? MDN has a good example of this here: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Introducing#callbacks

function doStep1(init: number, callback: any): void {
  const result = init + 1;
  callback(result);
}

function doStep2(init: number, callback: any): void {
  const result = init + 2;
  callback(result);
}

function doStep3(init: number, callback: any): void {
  const result = init + 3;
  callback(result);
}

function callbackMethodChained(): void {
  console.log("callbackMethodChained() called");
  let intSum = 0;
  doStep1(0, (result1: number) => {
    // Optionally do something with the result
    intSum += result1;
    doStep2(result1, (result2: number) => {
      // Optionally do something with the result
      intSum += result2;
      doStep3(result2, (result3: number) => {
        // Optionally do something with the result
        intSum += result3;
      });
    });
  });
  console.log(`result: ${intSum}`);
}

// Second let's take a look at using promises. Promises are also common in old code. They're a bit easier to read than callbacks, but still verbose and error prone.

function promiseOne(): Promise<string> {
  return fetch("https://pokeapi.co/api/v2/ability/1")
    .then((response) => response.json())
    .then((data) => data.name);
}

function promiseTwo(): Promise<string> {
  return fetch("https://pokeapi.co/api/v2/ability/2")
    .then((response) => response.json())
    .then((data) => data.name);
}

function promiseThree(): Promise<string> {
  return fetch("https://pokeapi.co/api/v2/ability/3")
    .then((response) => response.json())
    .then((data) => data.name);
}

function promiseMethod(): void {
  console.log("promiseMethod() called");
  promiseOne().then((name) => console.log(name));
  promiseTwo().then((name) => console.log(name));
  promiseThree().then((name) => console.log(name));
}

function promiseAllMethod(): void {
  console.log("promiseAllMethod() called");
  Promise.all([promiseOne(), promiseTwo(), promiseThree()]).then((res) => {
    console.log(res);
  });
}

// When using the promise method -- what if you wanted to use the returned from the promises before the main thread continues to execute other code
// Without async/await you'd have two main options:
// 1. Use .then() calls to chain the promises together

function getPromiseValuesChained(): void {
  console.log("getPromiseValuesChained() called");
  promiseOne()
    .then((name) => {
      // Do something with the name
      console.log(name);
      return promiseTwo();
    })
    .then((name) => {
      // Do something with the name
      console.log(name);
      return promiseThree();
    })
    .then((name) => {
      // Do something with the name
      console.log(name);
    });
}

// 2. Use promise.all() and .then() to get the values from all the promises
function getPromiseAllMethod(): void {
  console.log("getPromiseAllMethod() called");
  Promise.all([promiseOne(), promiseTwo(), promiseThree()]).then((names) => {
    names.forEach((name) => console.log(name));
  });
}

// With async/await it's much simpler -- However the return type must be a Promise which can
// cause issues with refactoring existing code

async function getPromiseValuesAsync(): Promise<void> {
  console.log("getPromiseValuesAsync() called");
  const name1 = await promiseOne();
  // Do something with the name
  console.log(name1);
  const name2 = await promiseTwo();
  // Do something with the name
  console.log(name2);
  const name3 = await promiseThree();
  // Do something with the name
  console.log(name3);
}

// Set and call the async methods
(() => {
  // ** callback method **:
  callbackMethod();
  callbackMethodChained();

  // ** promise method **:
  promiseMethod();
  promiseAllMethod();

  // // ** promises chained method **:
  getPromiseValuesChained();

  // ** promise all method **:
  getPromiseAllMethod();

  // ** async/await method **:
  getPromiseValuesAsync();
})();
