import { validateEquation, calcEquation } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.input-validation');
  const equationInput = document.querySelector('#equation');
  const errorOutput = document.querySelector('.error-output');
  const resultOutput = document.querySelector('.result');

  if (!(form && equationInput && errorOutput && resultOutput)) {
    return;
  }

  form.setAttribute('novalidate', '');

  const setState = (errorMessage = '', resultMessage = '') => {
    errorOutput.textContent = errorMessage;
    resultOutput.textContent = resultMessage;
  };

  const validateField = () => {
    const equation = equationInput.value;
    const validationError = validateEquation(equation);

    if (validationError) {
      equationInput.classList.add('error');
      setState(validationError, '');
      return false;
    }

    equationInput.classList.remove('error');
    setState('', '');
    return true;
  };

  form.addEventListener('input', validateField);

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const isValid = validateField();

    if (!isValid) {
      return;
    }

    const result = calcEquation(equationInput.value);
    setState('', result);
  });
});
