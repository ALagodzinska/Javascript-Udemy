'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

const renderCountry = function (data, className = '') {
  const html = `
  <article class="country ${className}">
          <img class="country__img" src="${data.flags.png}" />
          <div class="country__data">
            <h3 class="country__name">${data.name.common}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              +data.population / 1000000
            ).toFixed(1)}</p>
            <p class="country__row"><span>🗣️</span>${
              Object.values(data.languages)[0]
            }</p>
            <p class="country__row"><span>💰</span>${
              Object.values(data.currencies)[0].name
            }</p>
          </div>
        </article>`;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};

const getJson = function (url, errorMsg = 'Something went wrong!') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} ${response.status}!`);

    return response.json();
  });
};

// Asynchronous Javascript AJAX and Apis
/*
// img.src - was implemented in js in async way, to load image in background
// addEvent Listener - is not an async function! It si,ply waits for event to happen, do not do anything in the background
// AJAX - asynchronous javascript and xml - allow to communicate with remote servers in async way. We can request data from web servers dynamically.
// API - application programming interface - piece of software can be used by another piece of software
// Most popular API data format - json
// CORS -Cross Origin Resource Sharing - allows us to access api
*/

// XMLHttpRequest
/*
// old school way of ajax
const getCountryData = function (country) {
  const request = new XMLHttpRequest();
  // pass type of request
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  // fetches data in the background
  request.send();
  // console.log(request.responseText); // don't work

  request.addEventListener('load', function () {
    // this = request
    //   console.log(this.responseText);
    // convert to javascript object
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    const html = `
  <article class="country">
          <img class="country__img" src="${data.flags.png}" />
          <div class="country__data">
            <h3 class="country__name">${data.name.common}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              +data.population / 1000000
            ).toFixed(1)}</p>
            <p class="country__row"><span>🗣️</span>${
              Object.values(data.languages)[0]
            }</p>
            <p class="country__row"><span>💰</span>${
              Object.values(data.currencies)[0].name
            }</p>
          </div>
        </article>`;

    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
  });
};

// two calls happen at the same time
// who arrives first gets printed first, they change
getCountryData('portugal');
getCountryData('usa');
getCountryData('germany');
*/

// Sequence for ajax calls
/*
const renderCountry = function (data, className = '') {
  const html = `
  <article class="country ${className}">
          <img class="country__img" src="${data.flags.png}" />
          <div class="country__data">
            <h3 class="country__name">${data.name.common}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              +data.population / 1000000
            ).toFixed(1)}</p>
            <p class="country__row"><span>🗣️</span>${
              Object.values(data.languages)[0]
            }</p>
            <p class="country__row"><span>💰</span>${
              Object.values(data.currencies)[0].name
            }</p>
          </div>
        </article>`;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const getCountryAndNeighbor = function (country) {
  // Ajax call country one
  const request = new XMLHttpRequest();
  // pass type of request
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  // fetches data in the background
  request.send();

  // nested callbacks
  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    // render country one
    renderCountry(data);

    // Get neighbor country
    const [neighbor] = data.borders;

    if (!neighbor) return;

    // Ajax call country two
    const request2 = new XMLHttpRequest();
    // pass type of request
    request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbor}`);
    // fetches data in the background
    request2.send();

    request2.addEventListener('load', function () {
      const [data2] = JSON.parse(this.responseText);
      console.log(data2);

      renderCountry(data2, 'neighbor');
    });
  });
};

getCountryAndNeighbor('usa');

// Callback hell
setTimeout(() => {
  console.log('1 second past');
  setTimeout(() => {
    console.log('2 second past');
    setTimeout(() => {
      console.log('3 second past');
      setTimeout(() => {
        console.log('4 second past');
      }, 1000);
    }, 1000);
  }, 1000);
}, 1000);
*/

// Promises and Fetch API
/*
// const request = fetch(`https://restcountries.com/v3.1/name/portugal`);
// // Gets a promise
// console.log(request);
// Promise - an object that is used as a placeholder for the future result of async operation.
// A container for a future value; (response from ajax call)
// Can chain promises
// Consuming Promises

// const getCountryData = function (country) {
//   // then method available on promises - execute smth as soon as event is fulfilled
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(function (response) {
//       // dat stored in response body
//       // to read data we need to call json method
//       console.log(response);
//       // also returns a new promise
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data);
//       renderCountry(data[0]);
//     });
// };

// will return a promise
const getJson = function (url, errorMsg = 'Something went wrong!') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} ${response.status}!`);

    return response.json();
  });
};

// const getCountryData = function (country) {
//   // fetch promise only rejects when there is no internet connection

//   // Country One
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(
//       response => {
//         console.log(response);

//         if (!response.ok)
//           // by throwing an error promise will be immediately rejected and will go to catch handler
//           throw new Error(`Country not found ${response.status}!`);

//         return response.json();
//       }
//       // second callback function to catch an error
//       //   err => alert(err)
//     )
//     .then(data => {
//       renderCountry(data[0]);
//       //   const neighbor = data[0].borders[0];
//       const neighbor = 'gsajgd';

//       if (!neighbor) return;

//       // Country Two
//       // don't chain directly here
//       return fetch(`https://restcountries.com/v3.1/alpha/${neighbor}`);
//     })
//     .then(response => {
//       if (!response.ok)
//         // by throwing an error promise will be immediately rejected and will go to catch handler
//         throw new Error(`Country not found ${response.status}!`);

//       return response.json();
//     })
//     .then(data => {
//       renderCountry(data[0], 'neighbor');
//     })
//     // handle all errors
//     // called only when promise is rejected
//     .catch(err => {
//       console.error(`${err} 😨👾`);
//       renderError(`Something went wrong! 😨 ${err.message}. Try again!`);
//     })
//     // no matter if promise is fulfilled or rejected it will always be called
//     // example - hide spinner(loading) when operation completed
//     .finally(() => {
//       // make container visible
//       countriesContainer.style.opacity = 1;
//     });
// };

const getCountryData = function (country) {
  // fetch promise only rejects when there is no internet connection

  // Country One
  getJson(
    `https://restcountries.com/v3.1/name/${country}`,
    'Country Not Found!'
  )
    .then(data => {
      renderCountry(data[0]);

      // do nothing just simply returning
      if (!('borders' in data[0])) throw new Error('No neighbor found!');
      const neighbor = data[0].borders[0];

      // Country Two
      return getJson(
        `https://restcountries.com/v3.1/alpha/${neighbor}`,
        `Country Not Found!`
      );
    })
    .then(data => {
      renderCountry(data[0], 'neighbor');
    })
    .catch(err => {
      console.error(`${err} 😨👾`);
      renderError(`Something went wrong! 😨 ${err.message}. Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

// btn.addEventListener('click', function () {
//   getCountryData('portugal');
// });

// creating another error
// promise still gets fulfilled
// getCountryData('australia');
*/

// The Event Loop
/*
// Async tasks run in web Api environment, not in call stack
// Callback queue - store callback functions
// Promises do not go in callback queue, they go in microtasks queue. They have priority over callback queue.

// code outside of any callback will run first

console.log('Test Start');
// gets delayed if microtasks take longer time
setTimeout(() => console.log('0 sec timer'), 0);
// Allows to create a promise that is immediately resolved
Promise.resolve('Resolved promise one').then(res => console.log(res));

Promise.resolve('Resolved promise two').then(res => {
  for (let i = 0; i < 1000000000; i++) {}
  console.log(res);
});

console.log('Test end');
*/

// Building A Simple Promise
/*
// creating a promise
// promisify
const lotteryPromise = new Promise(function (resolve, reject) {
  // executor function, will execute this function
  console.log('Lottery draw is happening 🔃');
  setTimeout(function () {
    if (Math.random() >= 0.5) {
      // to set promise as fulfilled
      // the value that we pass in resolve method will be available in then method
      resolve('YOU WIN 🥇');
    } else {
      // when promise is rejected
      reject(new Error('You lost your money 💩'));
    }
  }, 2000);
});

lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

// Promisifying set timeout - real world example
const wait = function (seconds) {
  // timer cant fail, thats why only resolve is needed
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

wait(1)
  .then(() => {
    console.log('1 second past');
    return wait(1);
  })
  .then(() => {
    console.log('2 second past');
    return wait(1);
  })
  .then(() => {
    console.log('3 second past');
    return wait(1);
  })
  .then(() => {
    console.log('4 second past');
    return wait(1);
  });

// create resolved promise immediately
// appear in te beginning
Promise.resolve('HELLO 🥰').then(x => console.log(x));
Promise.reject(new Error('BYE 😨')).catch(x => console.error(x));
*/

// Promisifying THe Geolocation Api
/*
// navigator.geolocation.getCurrentPosition(
//   position => console.log(position),
//   error => console.log(error)
// );
// console.log('Getting position'); // will be logged first

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position),
    //   error => reject(error)
    // );
    // THE SAME
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

getPosition().then(position => console.log(position));

const whereAmI = function () {
  getPosition()
    .then(position => {
      const { latitude: lat, longitude: lng } = position.coords;

      return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    })
    .then(response => {
      if (!response.ok)
        throw new Error(`Problem with geocoding ${response.status}!`);

      return response.json();
    })
    .then(data => {
      console.log(data);
      console.log(`You are in ${data.city}, ${data.country}`);

      return fetch(
        `https://restcountries.com/v3.1/name/${data.country.toLowerCase()}`
      );
    })
    .then(response => {
      if (!response.ok)
        throw new Error(`Country not found! ${response.status}!`);

      return response.json();
    })
    .then(data => renderCountry(data[0]))
    .catch(err => console.error(`${err.message} 👾`))
    .finally(() => (countriesContainer.style.opacity = 1));
};

btn.addEventListener('click', whereAmI);
*/

// Consuming Promises with Async/Await
// Error handling with Try...Catch
/*
// when this function is done it will return a promise
// not blocking main thread of execution

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const whereAmI = async function () {
  // Geolocation
  try {
    const position = await getPosition();
    const { latitude: lat, longitude: lng } = position.coords;

    // Reverse Geo coding
    const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    // need to throw error manually
    if (!resGeo.ok) throw new Error(`Problem getting location data!`);

    const dataGeo = await resGeo.json();
    // console.log(dataGeo);
    // can have one or more await statements
    // still is a promise
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${dataGeo.country}`
    );
    if (!response.ok) throw new Error(`Problem getting country!`);
    const data = await response.json();

    // console.log(data);
    renderCountry(data[0]);

    return `You are in ${dataGeo.city}, ${dataGeo.country}`;
  } catch (err) {
    console.error(`${err} 💩💩💩`);
    renderError(`Something went wrong 😨 ${err.message}`);
    // rethrow the error
    // Reject promise returned from async function
    throw err;
  }
};

console.log('1. Will get location');
// async function always returns a promise
// const city = whereAmI();
// console.log(city);
// whereAmI()
//   .then(city => console.log(`2: ${city}`))
//   // to display an error< rethrow in prev function
//   .catch(err => console.error(`2: ${err.message} 💩💩💩`))
//   .finally(() => console.log('3: Finished getting location'));
// console.log('3.Finished getting location'); // displayed first than method

// try {
//   let y = 1;
//   const x = 2;
//   x = 3;
// } catch (error) {
//   alert(error.message);
// }

// Returning Values From async Functions

// immediately called function
// (async function () {
//   try {
//     const response = await whereAmI();
//     console.log(`2: ${response}`);
//   } catch (err) {
//     console.error(`${err} 😨😨😨`);
//   }
//   // always will be executed
//   console.log('3: Finished getting location');
// })();
*/

// Running Promises in Parallel
/*
const get3Countries = async function (c1, c2, c3) {
  try {
    // running in sequence
    // const [data1] = await getJson(`https://restcountries.com/v3.1/name/${c1}`);
    // const [data2] = await getJson(`https://restcountries.com/v3.1/name/${c2}`);
    // const [data3] = await getJson(`https://restcountries.com/v3.1/name/${c3}`);

    // multiple async operations at the same time and don't depend on each other
    // running in parallel
    // return a new promise
    // array of results of promises
    // if one of the promises rejects, whole promise rejects
    const data = await Promise.all([
      getJson(`https://restcountries.com/v3.1/name/${c1}`),
      getJson(`https://restcountries.com/v3.1/name/${c2}`),
      getJson(`https://restcountries.com/v3.1/name/${c3}`),
    ]);

    console.log(data.map(d => d[0].capital));

    // console.log([data1.capital, data2.capital, data3.capital]);
  } catch (err) {
    console.error(err);
  }
};

get3Countries('portugal', 'canada', 'tanzania');
*/

// Promise Combinators : Race, ALLSETTELED and any

// Promise.race - fastest gets returned
// receives array of promises and returns promise
// returns the first finished promise
// will change from time to time
// rejected promise can also be returned

// (async function () {
//   const res = await Promise.race([
//     getJson(`https://restcountries.com/v3.1/name/latvia`),
//     getJson(`https://restcountries.com/v3.1/name/lithuania`),
//     getJson(`https://restcountries.com/v3.1/name/estonia`),
//   ]);

//   console.log(res[0]);
// })();

// can create timeout promise

const timeout = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error('Request took too long!'));
    }, sec * 1000);
  });
};

// if timeout happens first it all will get rejected
Promise.race([
  getJson(`https://restcountries.com/v3.1/name/latvia`),
  timeout(0.15),
])
  .then(res => console.log(res[0]))
  .catch(err => console.error(err));

// Promise.allSettled
// takes an array of promises, return array of all settled promises
// never short circuits, even if rejects, return all promises

// return every promise
Promise.allSettled([
  Promise.resolve('Success'),
  Promise.reject('Error'),
  Promise.resolve('Another Success'),
]).then(res => console.log(res));

// get rejected by one error
// Promise.all([
//   Promise.resolve('Success'),
//   Promise.reject('Error'),
//   Promise.resolve('Another Success'),
// ])
//   .then(res => console.log(res))
//   .catch(err => console.error(err));

//Promise.any
// return the first fulfilled promise
// rejected promises are ignored
// similar to race which return rejected promise, but this one returns only fulfilled
Promise.any([
  Promise.resolve('Success'),
  Promise.reject('Error'),
  Promise.resolve('Another Success'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));
