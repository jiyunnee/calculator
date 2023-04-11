const inputBox = document.querySelector('.input-box');
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const clearButton = document.querySelector('.clear');
const calculateButton = document.querySelector('.calculate');

let currentValue = 0;
let currentOperator = null;
let shouldResetInput = false;

function resetInput() {
  inputBox.value = '';
  shouldResetInput = false;
}

function updateInput(value) {
  if (shouldResetInput) {
    resetInput();
  }

  inputBox.value += value;
}

function handleNumberButtonClick(e) {
  const value = e.target.value;
  updateInput(value);
}

function handleOperatorButtonClick(e) {
  const operator = e.target.value;

  if (currentOperator !== null) {
    const operand = parseFloat(inputBox.value);
    currentValue = evaluate(currentValue, currentOperator, operand);
    inputBox.value = currentValue;
  } else {
    currentValue = parseFloat(inputBox.value);
  }

  currentOperator = operator;
  shouldResetInput = true;
}

function handleClearButtonClick() {
  currentValue = 0;
  currentOperator = null;
  resetInput();
}

function handleCalculateButtonClick() {
  const operand = parseFloat(inputBox.value);
  currentValue = evaluate(currentValue, currentOperator, operand);
  inputBox.value = currentValue;
  currentOperator = null;
  shouldResetInput = true;
}

function evaluate(a, operator, b) {
  switch (operator) {
    case '+':
      return a + b;
    case '-':
      return a - b;
    case '*':
      return a * b;
    case '/':
      return a / b;
    default:
      return b;
  }
}

numberButtons.forEach(button => {
  button.addEventListener('click', handleNumberButtonClick);
});

operatorButtons.forEach(button => {
  button.addEventListener('click', handleOperatorButtonClick);
});

clearButton.addEventListener('click', handleClearButtonClick);
calculateButton.addEventListener('click', handleCalculateButtonClick);
