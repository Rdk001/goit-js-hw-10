import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
// import './fetchCountries';
const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.input.addEventListener(
  'input',
  debounce(generationCountry, DEBOUNCE_DELAY)
);

function generationCountry(e) {
  let countryName = e.target.value;
  let countryNameFixed = countryName.toLowerCase().trim();
  if (countryNameFixed === '') {
    const containerInfo = document.querySelector('.container-info');
    refs.countryList.innerHTML = '';
    refs.countryInfo.removeChild(containerInfo);
    return;
  }
  fetchCountries(countryNameFixed)
    .then(renderingCountry)
    .catch(error => {
      Notiflix.Notify.failure('Oops, there is no country with that name');
    });
}

function renderingCountry(arrayOfObjects) {
  let result = arrayOfObjects.map(
    item =>
      `<li class="country-item"><img src=${item.flags.svg} alt="${item.flags.alt}"/><p class="country_name">${item.name.official}</p></li>`
  );
  if (result.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
    result = [];
  }
  if (result.length === 1) {
    refs.countryList.innerHTML = '';
    let countryInfoList = arrayOfObjects.map(item => {
      let array = Object.values(item.languages);
      let stringLanguages = array.join(',');
      return `<div class="container-info"><div class="container-title"><img class="title-svg" src=${item.flags.svg} alt="${item.flags.alt}"/><h1 class="title">${item.name.official}</h1></div><ul class="country-list"><li class="country-info-item"><b>Capital:</b><p class="text">${item.capital}</p></li><li class="country-info-item"><b>Population:</b><p class="text">${item.population}</p></li><li class="country-info-item"><b>languages:</b><p class="text">${stringLanguages}</p></ul></div>`;
    });
    result = [];
    refs.countryInfo.insertAdjacentHTML('beforeend', countryInfoList.join(''));
  }
  // if (result.length !== 1) {
  //   refs.countryInfo.innerHTML = '';
  // }
  refs.countryList.insertAdjacentHTML('beforeend', result.join(''));
  refs.countryInfo.innerHTML = countryInfoList;
}

function fetchCountries(name) {
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
  ).then(r => {
    return r.json();
  });
}
