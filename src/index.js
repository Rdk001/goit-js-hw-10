import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';
import { renderingCountry, refs } from './renderingCountry';
const DEBOUNCE_DELAY = 300;

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
    refs.countryInfo.innerHTML = '';
    return;
  }
  fetchCountries(countryNameFixed)
    .then(renderingCountry)
    .catch(error => Notiflix.Notify.failure(error.message));
}
