// Importing Module

// Javascript Modules
/*
Differences with scripts 
 In module 
    1) Top-lvl var are scoped to module;
    2) By default it has strict mode
    3) Top-lvl this is undefined
    4) Supports imports and exports
    5) To use module in HTML add <script type="module"></script>
    6) File downloading happens async


    // Modules are imported synchronously

 */

// Exporting And Importing In ES6 Modules
/*
// import { addToCart, totalPrice as price, tq } from './shoppingCart.js';
// addToCart('bread', 5);
// console.log(price, tq);

// Import everything
// exports as an object/Public Api

// import * as ShoppingCart from './shoppingCart.js';
// ShoppingCart.addToCart('bread', 5);
// console.log(ShoppingCart.totalPrice);

// All the code that this module imports is executed first!

console.log('Importing Module!');
// console.log(shippingCost); // error

// imports default value
// can have named and default exports at the same time
// import add, { addToCart, totalPrice as price, tq } from './shoppingCart.js';
import add, { cart } from './shoppingCart.js';
add('pizza', 2);
add('bread', 5);
add('apples', 2);
// console.log(price);
// Imports have lifelong connection
// Imports are not copies of the export. Stored in the same place in memory
console.log(cart);
*/

// Top-level Await (ES2022)
/*
// await works outside of async function
// works only in modules (in html add type-module to script)
// blocks whole module execution
// console.log('Start Fetching');
// const res = await fetch('https://jsonplaceholder.typicode.com/posts');
// const data = await res.json();
// console.log(data);
// console.log('Something');

// returns a promise
const getLastPost = async function () {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await res.json();
  console.log(data);

  // at method
  // get last element
  return { title: data.at(-1).title, text: data.at(-1).body };
};

// use top level await
const lastPost = await getLastPost();
console.log(lastPost);

// Not clean
// lastPost.then(last => console.log(last));
*/

// The Module Pattern
/*
// immediately invoked function
const ShoppingCart2 = (function () {
  const cart = [];
  const shippingCost = 10;
  const totalPrice = 237;
  const totalQuantity = 123;

  const addToCart = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(
      `${quantity} ${product} added to cart (shipping cost is ${shippingCost})`
    );
  };

  const orderStock = function (product, quantity) {
    console.log(`${quantity} ${product} ordered from supplier`);
  };

  return {
    addToCart,
    cart,
    totalPrice,
    totalQuantity,
  };
})();

ShoppingCart2.addToCart('apple', 4);
ShoppingCart2.addToCart('pizza', 2);
console.log(ShoppingCart2);
console.log(ShoppingCart2.shippingCost); // undefined
// closures allow access to all properties when it was created
*/

// CommonJS Modules
/*
// have been used in node js
// node js is way to run js on web server outside of browser

// would work in node js
// Export
export.addToCart = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(
      `${quantity} ${product} added to cart (shipping cost is ${shippingCost})`
    );
  };

  // Import
  const {addToCart} = require("./shoppingCart.js")
  */

// Introduction to NPM

// import cloneDeep from './node_modules/lodash-es/cloneDeep.js';

import cloneDeep from 'lodash-es';

const state = {
  cart: [
    { product: 'bread', qty: 5 },
    { product: 'bread', qty: 5 },
  ],
  user: { loggedIn: true },
};

const stateClone = Object.assign({}, state);

// Deep clone
const stateDeepClone = cloneDeep(state);

console.log(stateClone);
// if we change main object, clone also changes
state.user.loggedIn = false;
console.log(stateClone);

// clone will not change
console.log(stateDeepClone);

// Bundling With Parcel and NPM Scripts

// parcel is a dev dependency

// hot module replacement
// whenever we change something, page will not be reloaded
// state on the page will be maintained
// if we have array it will be same as it was before reload
if (module.hot) {
  module.hot.accept();
}
