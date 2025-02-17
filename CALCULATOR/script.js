let currentInput = "0";
let currentOperator = null;
let previousInput = null;
let newNumber = true;

const display = document.getElementById("display");

function updateDisplay() {
  display.textContent = currentInput;
}

function appendNumber(number) {
  if (newNumber) {
    currentInput = number;
    newNumber = false;
  } else {
    if (currentInput === "0" && number !== "00") {
      currentInput = number;
    } else {
      currentInput += number;
    }
  }
  updateDisplay();
}

function appendDecimal() {
  if (!currentInput.includes(".")) {
    currentInput += ".";
    newNumber = false;
    updateDisplay();
  }
}

function appendOperator(operator) {
  if (previousInput !== null) {
    calculate();
  }
  previousInput = parseFloat(currentInput);
  currentOperator = operator;
  newNumber = true;
}

function calculate() {
  if (currentOperator === null || newNumber) {
    return;
  }

  const current = parseFloat(currentInput);
  let result;

  switch (currentOperator) {
    case "+":
      result = previousInput + current;
      break;
    case "-":
      result = previousInput - current;
      break;
    case "*":
      result = previousInput * current;
      break;
    case "/":
      if (current === 0) {
        result = "Error";
      } else {
        result = previousInput / current;
      }
      break;
  }

  currentInput = result.toString();
  currentOperator = null;
  previousInput = null;
  newNumber = true;
  updateDisplay();
}

function calculatePercentage() {
  const current = parseFloat(currentInput);
  currentInput = (current / 100).toString();
  updateDisplay();
}

function clearDisplay() {
  currentInput = "0";
  currentOperator = null;
  previousInput = null;
  newNumber = true;
  updateDisplay();
}

function deleteLast() {
  if (currentInput.length > 1) {
    currentInput = currentInput.slice(0, -1);
  } else {
    currentInput = "0";
  }
  updateDisplay();
}
