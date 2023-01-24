/**

    Main thread moves of execution context without 'await'. Promise all then forEach log value of async resolved promises.

    Result:

    [LOG]: "Begin code execution" <-- **
    [LOG]: "moduleOneSyncFunc() start"
    [LOG]: "moduleOneSyncFunc() end"
    [LOG]: "Thread reaches end of code execution" <-- **
    [LOG]: "stench"
    [LOG]: "drizzle"
    [LOG]: "speed-boost"
 */

// Network call 1
function funcOne(): Promise<string> {
  return fetch("https://pokeapi.co/api/v2/ability/1")
    .then((response) => response.json())
    .then((data) => data.name);
}

// Network call 2
function funcTwo(): Promise<string> {
  return fetch("https://pokeapi.co/api/v2/ability/2")
    .then((response) => response.json())
    .then((data) => data.name);
}

// Network call 3
function funcThree(): Promise<string> {
  return fetch("https://pokeapi.co/api/v2/ability/3")
    .then((response) => response.json())
    .then((data) => data.name);
}

function syncFunc(): Promise<string[]> {
  console.log("syncFunc() start");

  // Promise<string> network function calls
  const promiseOne = funcOne();
  const promiseTwo = funcTwo();
  const promiseThree = funcThree();

  // Group promises and resolve with the result of each
  const promiseRes = Promise.all([promiseOne, promiseTwo, promiseThree]);

  // Return network calls
  console.log("syncFunc() end");
  return promiseRes;
}

// Executor
(() => {
  console.log("Begin code execution");

  syncFunc().then((values) => {
    values.forEach((val) => console.log(val));
  });

  console.log("Thread reaches end of code execution");
})();
