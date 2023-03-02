'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
// node list ->
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
// Tabbed component
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
// Navigation bar
const nav = document.querySelector('.nav');

const openModal = function (event) {
  // for page to not jump to the top, because of href = #
  event.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

btnScrollTo.addEventListener('click', function (e) {
  e.preventDefault();
  // get coordinates where to move
  // const s1coords = section1.getBoundingClientRect();
  // console.log(s1coords); // DOM rectangle

  // element clicked coordinates
  // changes when scrolling
  // console.log(e.target.getBoundingClientRect());

  // Y -distance between element and top of the page
  // console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset);

  // read width and height of the viewport
  // console.log(
  // 'height/width viewport',
  // document.documentElement.clientHeight,
  // document.documentElement.clientWidth
  // );

  // Scrolling
  // absolute position relevant to entire page
  // current position + current scroll
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );

  // OLdschool way
  // to make scrolling smooth
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  // works same
  // only works with modern browsers
  section1.scrollIntoView({ behavior: 'smooth' });
});

// document.querySelectorAll('.nav__link').forEach(function (element) {
//   element.addEventListener('click', function (event) {
//     // to not scroll automatically
//     event.preventDefault();

//     // getting from element href
//     // put id where to scroll in the href with #
//     const id = this.getAttribute('href');
//     console.log(id);
//     // gets element to where to scroll
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

// Event Delegation
// 1. Add event listener to common parent element
// 2. Determine what element originated the event
document
  .querySelector('.nav__links')
  .addEventListener('click', function (event) {
    // seee where an event happend
    // console.log(event.target);
    // match only elements we are interested in
    if (
      event.target.classList.contains('nav__link') &&
      !event.target.classList.contains('nav__link--btn')
    ) {
      event.preventDefault();
      const id = event.target.getAttribute('href');
      console.log(id);
      // gets element to where to scroll
      document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
    }
  });

// Tabbed component
tabsContainer.addEventListener('click', function (event) {
  // fixes error when clicking on span
  // null if no matching parent element is found
  const clicked = event.target.closest('.operations__tab');

  // Guard clause
  // if nothing is clicked we want to finish function
  if (!clicked) return;

  // clear tabs and contyent classes from all
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  tabsContent.forEach(content =>
    content.classList.remove('operations__content--active')
  );

  // Activate Tab
  clicked.classList.add('operations__tab--active');

  // every data attribute you specified in your HTML file (as a key - value pair):
  // console.log(clicked.dataset.tab);
  // Activate content Area
  // get data-tab - use dateset on element and then second part from data, in this case tab

  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// Make fade animation
const handleHover = function (e) {
  // this === argument we passed in bind
  // console.log(this, e.currentTarget);

  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    // selecting siblings/from higher parent
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    // change the opacity of siblings
    // this === opacity
    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

// mouseenter doesnt bubble
// bind method creates copy of a function that been called on
// Passing an "argument" into handler
// passing additional value with this keyword
nav.addEventListener('mouseover', handleHover.bind(0.5));

// opposite of mouseover
// when remove cursor from link
nav.addEventListener('mouseout', handleHover.bind(1));

// Sticky navigation
// get position on where to start stick nav bar
const initialCoords = section1.getBoundingClientRect();
// console.log(initialCoords);

// will work each time we scroll page
// Bad way
// window.addEventListener('scroll', function (e) {
//   console.log(window.scrollY);

//   if (this.window.scrollY > initialCoords.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });

const header = document.querySelector('.header');

// calculate height where to start dynamically
const navHeight = nav.getBoundingClientRect().height;
// console.log(navHeight);

const stickyNav = function (entries) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  // when 0 percent of header is visible we want something to happen
  threshold: 0,
  // starts 90 px before
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

// Reveal Sections
const allSection = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  // observing only once
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  // only revealed when 15% visible
  threshold: 0.15,
});

allSection.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

// Lazy loading Images
// selecting all images that have an attribute of data-src
const imgTargets = document.querySelectorAll('img[data-src]');
// console.log(imgTargets);

const loadImg = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) return;

  // Replace src with data-src
  entry.target.src = entry.target.dataset.src;

  // only remove blurry filter when image is loaded
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  // stop observing
  observer.unobserve(entry.target);
};

const imageObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imgTargets.forEach(img => imageObserver.observe(img));

// Slider
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length;

  // just to test and see all slides
  // const slider = document.querySelector('.slider');
  // slider.style.transform = 'scale(0.4) translateX(-1200px)';
  // slider.style.overflow = 'visible';

  // slides.forEach((s, i) => (s.style.transform = `translateX(${100 * i}%)`));
  // 0%, 100%, 200%, 300%

  // Functions
  // create dots for slider
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    // select based on data attribute
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    createDots();
    activateDot(0);
    goToSlide(0);
  };
  init();

  // Event Handlers
  // Go to Next Slide
  btnRight.addEventListener('click', nextSlide);
  // curSlide = 1 = -100%, 0%, 100%, 200%
  btnLeft.addEventListener('click', prevSlide);

  // scroll slides with arrows
  document.addEventListener('keydown', function (e) {
    // console.log(e);
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide(); // short circuting if true go to the last
  });

  // add event handler to dots
  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      // destructuring ->
      const { slide } = e.target.dataset;
      goToSlide(slide);
      curSlide = Number(slide);
      activateDot(slide);
    }
  });
};
slider();

/////LECTURES/////
// Selecting, Creating and Deleting Elements
/*
// Selecting Elements
// selecting a whole page - entire html
console.log(document.documentElement);
// selecting head
console.log(document.head);
// selecting body
console.log(document.body);

const header = document.querySelector('.header'); // selecting one element
const allSections = document.querySelectorAll('.section'); // selecting multiple elements
// returns node-list, do not update automatically
console.log(allSections);

// getting element by id
document.getElementById('section--1');

// gets by tag
const allButtons = document.getElementsByTagName('button'); // get all buttons
console.log(allButtons); // returns html collection ; if DOM changes this collection will be updated automatically

// gets elements by class
// returns live collection
console.log(document.getElementsByClassName('btn'));

// Creating and Inserting Elemenets
// .insertAdjacentHTML /// create an elemnt using htnl string literal

const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent =
// 'We use cookies for improved functionality and analytics.';
message.innerHTML =
  'We use cookies for improved functionality and analytics. <button class="btn--close-cookie">Got it!</button>';

// inserts element as first child elemnt
header.prepend(message);
// inserts as last child element
header.append(message);
// only inserts once, cant be at multiple places at the same time

// if we want to insert multiple elemnts, first you need to copy it
// clone node means - copying elemnt if passed true it will copy all child elemnts of copied element
header.append(message.cloneNode(true));

// adds before header element
header.before(message);
// adds after header element
header.after(message);

// Delete elements
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove();
    // old method ->
    // DOM TReversing
    message.parentElement.removeChild(message);
  });
*/
// Styles, Attributes and Classes
/*
const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML =
  'We use cookies for improved functionality and analytics. <button class="btn--close-cookie">Got it!</button>';

const header = document.querySelector('.header');
header.append(message);

document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove();
  });

// Styles
// inline styles ->
message.style.backgroundColor = '#37383d';
message.style.width = '120%';

console.log(message.style.height); // only works for styles that we set ourselves
console.log(message.style.backgroundColor);

// getting all styles
// returns object with all applied styles
console.log(getComputedStyle(message));
console.log(getComputedStyle(message).color); // can select desired property
console.log(getComputedStyle(message).height);

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

// changes property value
document.documentElement.style.setProperty('--color-primary', 'orangered');

// Attributes
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.src); // is different than we have in html - is absolute url
// to get url from our html use get attribute
console.log(logo.getAttribute('src'));

console.log(logo.className);
// non-standard property
console.log(logo.designer); // cant read unusual properties
console.log(logo.getAttribute('designer')); // workaraound

// can set properties
logo.alt = 'Beautiful minimalist logo';
logo.setAttribute('company', 'Bankist');

const link = document.querySelector('.btn--show-modal');
console.log(link.href); // absolute
console.log(link.getAttribute('href')); // as wroted in html

// Data attributes
// property starts with data -
// here version-number -> turned into versionNumber
console.log(logo.dataset.versionNumber);

// Classes
logo.classList.add('c', 'h');
logo.classList.remove('c', 'h');
logo.classList.toggle('c'); // removing if present, adding if not
logo.classList.contains('c'); // not includes

// Dont use
// override and removes all other exsisting classes
logo.className = 'jonas';
*/
// Types of Events and Event Handlers
/*
const h1 = document.querySelector('h1');

// can only listen to event just once
const alertH1 = function (e) {
  alert('addEventListener: Great! You are reading the heading :D');

  // h1.removeEventListener('mouseenter', alertH1);
};

// mouseenter - as hovering mouse over
h1.addEventListener('mouseenter', alertH1);

// remove after some time
setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);

// onevent property
// h1.onmouseenter = function (e) {
//   alert('addEventListener: Great! You are reading the heading :D');
// };

// now always use addEventListener
// allows to add multiple event listeners to same event
// can remove an event handler if dont need it
*/
// Event Propagation: Bubbling and Capturing
/*
// random color
// rgb(255,255,255)
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
console.log(randomColor());

// are handling the same event'// bubbles up to parent elements
document.querySelector('.nav__link').addEventListener('click', function (e) {
  e.preventDefault();
  this.style.backgroundColor = randomColor();
  // e.target - where event happend
  // currentTarget - element to which event is attached
  console.log('LINK', e.target, e.currentTarget);
  console.log(e.currentTarget === this); // true

  // Stop propogation
  // dont reach parent elements
  e.stopPropagation();
  // two parent elements not change color
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  this.style.backgroundColor = randomColor();
  console.log('CONTAINER', e.target, e.currentTarget);
});

// use capture parameter (third one is set to true) will not listen to bubbling events, but to capturing
document.querySelector('.nav').addEventListener(
  'click',
  function (e) {
    e.preventDefault();
    this.style.backgroundColor = randomColor();
    console.log('NAV', e.target, e.currentTarget);
  }
  // true // the first element appearing
);
*/
// DOM Traversing
/*
// can select an element based on another element
const h1 = document.querySelector('h1');

// Going downwards: selecting child elements
console.log(h1.querySelectorAll('.highlight')); // will go as deep as needed
console.log(h1.childNodes); // every signle node of every signle type exsists
console.log(h1.children); // returns html collection // works only for direct children

h1.firstElementChild.style.color = 'white'; // first child
h1.lastElementChild.style.color = 'orangered'; // last child

// Going upwards: selecting parents
console.log(h1.parentNode);
console.log(h1.parentElement);

// parent element which is not a direct parent
// closest parent element with this class
// set background to the css variable
h1.closest('.header').style.background = 'var(--gradient-secondary)';

h1.closest('h1').style.background = 'var(--gradient-secondary)'; // the element itself

// Sideways: selecting siblings

// can only access direct siblings - previous and next one
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

console.log(h1.previousSibling);
console.log(h1.nextSibling);

// Getting all siblings
console.log(h1.parentElement.children); // all of the siblings
[...h1.parentElement.children].forEach(function (el) {
  // comparisons between elements
  if (el !== h1) el.style.transform = 'scale(0.5)';
});
*/
// The Intersection Observer API
/*
// const obsCallback = function (entries, observer) {
//   // each time target element is intersecting root element
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };

// const obsOptions = {
//   // element that the target is intersecting
//   root: null,
//   // percentage of intersaction at which callback function will be called
//   // threshold: 0.1,
//   // 0 - callback will trigger each time it will move out of the view
//   // 1(if put in middle) - 100% section is visible
//   threshold: [0, 0.2],
// };

// const observer = new IntersectionObserver(obsCallback, obsOptions);
// // whenever section1 is intersecting viewport at 10%
// observer.observe(section1);
*/
// Lifecycle DOM Events
/*
// just html and js need to be loaded
// not images
// code that needs to be executed after Dom is ready
document.addEventListener('DOMContentLoaded', function (e) {
  console.log('HTML parsed and DOM tree built');
});

// === document.ready (jQuery)

// Load event when all external files are loaded(img, css etc)
window.addEventListener('load', function (e) {
  console.log('Page fully loaded', e);
});

// event before user closes tab
window.addEventListener('beforeunload', function (e) {
  // to ask users if they are 100% sure to leave the page
  e.preventDefault();
  console.log(e);
  e.returnValue = '';
});
*/
// Efficient Script Loading: defer and async

// can add async or defer attr to js html tag
/*
 <script src="script.js"></script> //stops app | put in the end of the body!
 <script async src="script.js"></script> // script is loaded in the same time HTML is parsed, HTML stops for script execution | makes page loading time shorter ! PUT IN THE HEAD
 <script defer src="script.js"></script> // script loaded async, but script execution will run at the end | exactly what we want! | same time as async! PUT IN THE HEAD
 // ASYNC AND DEFER DOESNT MAKE SENCE IN THE END
*/
