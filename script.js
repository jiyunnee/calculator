const display = document.querySelector('.calculator-display');

const numberButtons = document.querySelectorAll('[data-number]');

const operatorButtons = document.querySelectorAll('[data-operator]');

const clearButton = document.querySelector('[data-clear]');

const equalsButton = document.querySelector('[data-equals]');

 

let currentValue = '';

let previousValue = '';

let currentOperator = null;

let shouldResetDisplay = false;

 

numberButtons.forEach(button => {

button.addEventListener('click', () => {

if (shouldResetDisplay) {

display.value = '';

shouldResetDisplay = false;

}

display.value += button.textContent;

});

});

 

operatorButtons.forEach(button => {

button.addEventListener('click', () => {

if (currentOperator) calculate();

previousValue = display.value;

currentOperator = button.dataset.operatorType;

shouldResetDisplay = true;

});

});

 

equalsButton.addEventListener('click', () => {

if (!currentOperator) return;

calculate();

});

 

clearButton.addEventListener('click', () => {

currentValue = '';

previousValue = '';

currentOperator = null;

display.value = '';

});

 

function calculate() {

currentValue = display.value;

let result;

 

switch (currentOperator) {

case 'add':

result = parseFloat(previousValue) + parseFloat(currentValue);

break;

case 'subtract':

result = parseFloat(previousValue) - parseFloat(currentValue);

break;

case 'multiply':

result = parseFloat(previousValue) * parseFloat(currentValue);

break;

case 'divide':

result = parseFloat(previousValue) / parseFloat(currentValue);

break;

default:

return;

}

 

display.value = result;

currentOperator = null;

shouldResetDisplay = true;

}
