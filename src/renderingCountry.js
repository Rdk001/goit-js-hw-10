import Notiflix from 'notiflix';

function renderingCountry(arrayOfObjects) {
  if (arrayOfObjects.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  }
  if (arrayOfObjects.length > 1 || arrayOfObjects.length <= 10) {
    let result = arrayOfObjects.map(
      item =>
        `<li class="country-item"><img src=${item.flags.svg} alt="${item.flags.alt}"/><p class="country_name">${item.name.official}</p></li>`
    );
    refs.countryList.innerHTML = result;
  }
  if (arrayOfObjects.length === 1) {
    refs.countryList.innerHTML = '';
    let countryInfoList = arrayOfObjects.map(item => {
      let array = Object.values(item.languages);
      let stringLanguages = array.join(',');
      return `<div class="container-info"><div class="container-title"><img class="title-svg" src=${item.flags.svg} alt="${item.flags.alt}"/><h1 class="title">${item.name.official}</h1></div><ul class="country-list"><li class="country-info-item"><b>Capital:</b><p class="text">${item.capital}</p></li><li class="country-info-item"><b>Population:</b><p class="text">${item.population}</p></li><li class="country-info-item"><b>languages:</b><p class="text">${stringLanguages}</p></ul></div>`;
    });
    refs.countryInfo.innerHTML = countryInfoList;
  }
  if (arrayOfObjects.length !== 1) {
    refs.countryInfo.innerHTML = '';
  }
}

const refs = {
  input: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

export { renderingCountry, refs };
