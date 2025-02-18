let currentInput = "0";
let equation = "";
let currentOperator = null;
let previousInput = null;
let newNumber = true;

const display = document.getElementById("display");
const equationDisplay = document.getElementById("equation"); // Add a new element in HTML for equation display

function updateDisplay() {
  display.textContent = currentInput;
  equationDisplay.textContent = equation; // Update full equation display
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
  equation += number;
  updateDisplay();
}

function appendDecimal() {
  if (!currentInput.includes(".")) {
    currentInput += ".";
    equation += ".";
    newNumber = false;
    updateDisplay();
  }
}

function appendOperator(operator) {
  if (newNumber && previousInput !== null) {
    equation = equation.slice(0, -1) + operator; // Replace last operator if needed
  } else {
    if (previousInput !== null) {
      calculate();
    }
    previousInput = parseFloat(currentInput);
    currentInput = "";
    newNumber = true;
    equation += " " + operator + " ";
  }
  currentOperator = operator;
  updateDisplay();
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
      result = current === 0 ? "Error" : previousInput / current;
      break;
  }

  equation += " = " + result;
  currentInput = result.toString();
  currentOperator = null;
  previousInput = null;
  newNumber = true;
  updateDisplay();
}

function calculatePercentage() {
  const current = parseFloat(currentInput);
  currentInput = (current / 100).toString();
  equation += "%";
  updateDisplay();
}

function clearDisplay() {
  currentInput = "0";
  equation = "";
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
  equation = equation.slice(0, -1);
  updateDisplay();
}
