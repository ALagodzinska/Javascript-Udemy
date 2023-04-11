'use strict';

const imgContainer = document.querySelector('.images');

// Challenge #1
/*
const countriesContainer = document.querySelector('.countries');

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
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
};

const getJson = function (url, errorMsg = 'Something went wrong!') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} ${response.status}!`);

    return response.json();
  });
};

const getCountryData = function (country) {
  getJson(
    `https://restcountries.com/v3.1/name/${country}`,
    'Country Not Found!'
  )
    .then(data => {
      renderCountry(data[0]);
      if (!('borders' in data[0])) throw new Error('No neighbor found!');
      const neighbor = data[0].borders[0];

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

// MY VERSION
// const whereAmI = function (lat, lng) {
//   let country;

//   fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
//     .then(response => {
//       if (!response.ok)
//         throw new Error(`Problem with geocoding ${response.status}!`);

//       return response.json();
//     })
//     .then(data => {
//       console.log(data);
//       console.log(`You are in ${data.city}, ${data.country}`);
//       country = data.country.toLowerCase();
//     })
//     .catch(err => console.error(`${err.message} 👾`))
//     .finally(() => {
//       getCountryData(country);
//     });
// };

const whereAmI = function (lat, lng) {
  let country;

  fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
    .then(response => {
      if (!response.ok)
        throw new Error(`Problem with geocoding ${response.status}!`);

      return response.json();
    })
    .then(data => {
      console.log(data);
      console.log(`You are in ${data.city}, ${data.country}`);
      country = data.country.toLowerCase();

      return fetch(`https://restcountries.com/v3.1/name/${country}`);
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

// whereAmI(52.508, 13.381);
whereAmI(19.037, 72.873);
// whereAmI(-33.933, 18.474);
*/

// Challenge #2

/*
// const img = document.createElement('img');
// img.src = 'img/img-1.jpg';

const imgContainer = document.querySelector('.images');

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;

    img.addEventListener('load', () => {
      imgContainer.append(img);
      resolve(img);
    });

    img.addEventListener('error', function () {
      reject(new Error('Failed to load an image!'));
    });
  });
};

let currentImage;

createImage('img/img-1.jpg')
  .then(img => {
    currentImage = img;
    return wait(2);
  })
  .then(() => {
    currentImage.style.display = 'none';
    return createImage('img/img-2.jpg');
  })
  .then(img => {
    currentImage = img;
    return wait(2);
  })
  .then(() => {
    currentImage.style.display = 'none';
    return createImage('img/img-3.jpg');
  })
  .then(img => {
    currentImage = img;
    return wait(2);
  })
  .then(() => {
    currentImage.style.display = 'none';
  })
  .catch(err => {
    console.error(`${err} 😨👾`);
  });
*/

// Challenge #3

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;

    img.addEventListener('load', () => {
      imgContainer.append(img);
      resolve(img);
    });

    img.addEventListener('error', function () {
      reject(new Error('Failed to load an image!'));
    });
  });
};

const loadNPause = async function () {
  try {
    // FIRST IMAGE
    let img = await createImage('img/img-1.jpg');
    console.log('Image 1 loaded!');
    await wait(2);
    img.style.display = 'none';
    // SECOND IMAGE
    img = await createImage('img/img-2.jpg');
    console.log('Image 2 loaded!');
    await wait(2);
    img.style.display = 'none';
    // THIRD IMAGE
    img = await createImage('img/img-3.jpg');
    console.log('Image 3 loaded!');
    await wait(2);
    img.style.display = 'none';
  } catch (err) {
    console.error(err);
  }
};

const loadAll = async function (imgArr) {
  try {
    // const imgs = await Promise.all(imgArr.map(img => createImage(img)));
    const imgs = imgArr.map(async img => await createImage(img));
    console.log(imgs);
    const imgsEl = await Promise.all(imgs);
    console.log(imgsEl);
    imgsEl.forEach(img => img.classList.add('parallel'));
  } catch (err) {
    console.error(err);
  }
};

// loadNPause();

loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);
