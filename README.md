# Async JavaScript and TypeScript - common patterns and examples

When refactoring old JS code, it's often useful to use async/await to simplify the code. This sidesteps many issues with callbacks or then chains and makes the code easier to read. However, sometimes changing a function to be 'async' to use 'await' can cause issues with the return type. For instance, an async function must return a Promise.

I've run into enough issues with race conditions and JS promises that I'm creating this to document to show some of the common patterns and examples that are useful in refactoring old code. Hopefully this will help others who are refactoring old code. I'll be iterating on this as I run into more patterns and ideas.

There's roughly three main ways to handle asynchronous code in JavaScript.
In chronological order from their release/use:
  1. Callbacks
  2. Promises
  3. Async/Await (Promises under the hood)

Instructions:
- Uncomment/comment methods in the IIFE at the bottom.
- Run instructions with TypeScript:
  - `tsc asyncPatterns.ts`
  - `node asyncPatterns.js`
