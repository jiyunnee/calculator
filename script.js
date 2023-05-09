function appendToDisplay(value) {
  var display = document.getElementById('display');
  display.value += value;
}

function calculateResult() {
  var display = document.getElementById('display');
  var result = eval(display.value);
  display.value = result;
}
