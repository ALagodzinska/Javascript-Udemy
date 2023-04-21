// Exporting Module
console.log('Exporting Module!');

// If imported module have top level await it will wait for it before importing
// Blocking code
// console.log('Start Fetching Users');
// await fetch('https://jsonplaceholder.typicode.com/users');
// console.log('Finish Fetching Users');

// are available inside the module and are private
const shippingCost = 10;
export const cart = [];

// exports always need to happen in top level code
export const addToCart = function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart`);
};

// Named exports to export multiple things
const totalPrice = 237;
const totalQuantity = 23;
// as - renaming variable
export { totalPrice, totalQuantity as tq };

// Default exports
// when we want to export one thing per module
// export value itself, without any name
export default function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart`);
}
