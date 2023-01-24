/**
    Demonstrate main thread moving out of execution context without 'await'. Potentially use callbacks in sync legancy code? Logs:

    Result:

    [LOG]: "Begin code execution"  <-- Code execution starts
    [LOG]: "moduleOneSyncFunc() start"
    [LOG]: "moduleOneSyncFunc() end"
    [LOG]: "moduleTwoSyncFunc() start"
    [LOG]: "moduleTwoSyncFunc() end"
    [LOG]: "Thread reaches end of code execution"  <-- thread moves out of module, current state of promises: pending
    [LOG]: "network call 1 res: ",  "stench"
    [LOG]: "network call 2 res: ",  "drizzle"
    [LOG]: "network call 3 res: ",  "speed-boost"
    [LOG]: "promise 100ms"
    [LOG]: "promise 200ms"
    [LOG]: "promise 300ms"
 */

// Shared variables
let networkCallResultOne: Promise<string>;
let networkCallResultTwo: Promise<string>;
let networkCallResultThree: Promise<string>;

// Network call 1
function networkFuncOne(): Promise<string> {
  return fetch("https://pokeapi.co/api/v2/ability/1")
    .then((response) => response.json())
    .then((data) => data.name);
}

// Network call 2
function networkFuncTwo(): Promise<string> {
  return fetch("https://pokeapi.co/api/v2/ability/2")
    .then((response) => response.json())
    .then((data) => data.name);
}

// Network call 3
function networkFuncThree(): Promise<string> {
  return fetch("https://pokeapi.co/api/v2/ability/3")
    .then((response) => response.json())
    .then((data) => data.name);
}

const moduleOneSyncFunc = () => {
  console.log("moduleOneSyncFunc() start");

  // For time reference
  const promiseOne = new Promise((resolve) =>
    resolve(setTimeout(() => console.log("promise 300ms"), 500))
  );
  const promiseTwo = new Promise((resolve) =>
    resolve(setTimeout(() => console.log("promise 200ms"), 250))
  );
  const promiseThree = new Promise((resolve) =>
    resolve(setTimeout(() => console.log("promise 100ms"), 100))
  );

  // Set results of network calls
  networkCallResultOne = networkFuncOne();
  networkCallResultTwo = networkFuncTwo();
  networkCallResultThree = networkFuncThree();

  console.log("moduleOneSyncFunc() end");
};

const moduleTwoSyncFunc = () => {
  console.log("moduleTwoSyncFunc() start");

  networkCallResultOne.then((res) => console.log("network call 1 res: ", res));
  networkCallResultTwo.then((res) => console.log("network call 2 res: ", res));
  networkCallResultThree.then((res) => console.log("network call 3 res: ", res));

  console.log("moduleTwoSyncFunc() end");
};

// Executor
(() => {
  console.log("Begin code execution");
  // Module one
  moduleOneSyncFunc();

  // Module two
  moduleTwoSyncFunc();
  console.log("Thread reaches end of code execution");
})();
