let firstNumber = '';
let secondNumber = '';
let operation = null;
let setResetScreen = false;

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operator");
const currentOperationScreen = document.getElementById(
  "currentOperationScreen"
);
const lastOperationScreen = document.getElementById("lastOperationScreen");
const equalButton = document.getElementById("equalsBtn");
const clearButton = document.getElementById("clearBtn");
const pointButton = document.getElementById("pointBtn");
const deleteButton = document.getElementById("deleteBtn");

deleteButton.addEventListener('click', unDo);
window.addEventListener('keydown', handleKeyboard);
pointButton.addEventListener("click", appendPoint)

clearButton.addEventListener("click", clear);
numberButtons.forEach((button) =>
  button.addEventListener("click", () => appendNumber(button.textContent))
);
operationButtons.forEach((button) =>
  button.addEventListener("click", () => setOperation(button.textContent))
);
equalButton.addEventListener("click", calculate);

function appendPoint() {
    if (currentOperationScreen.textContent.includes(".")) return;
    currentOperationScreen.textContent += '.';
}

function appendNumber(number) {
  if (currentOperationScreen.textContent === "0" || setResetScreen) {
    resetScreen();
  }
  currentOperationScreen.textContent += number;
}

function resetScreen() {
  currentOperationScreen.textContent = "";
  setResetScreen = false;
}

function roundToTwo(num) {
    return +(Math.round(num + "e+2")  + "e-2");
}

function setOperation(operator) {
if (operation != null) {calculate();};
  firstNumber = currentOperationScreen.textContent;
  operation = operator;
  lastOperationScreen.textContent = `${firstNumber} ${operation}`;
  setResetScreen = true;
}

function clear() {
    currentOperationScreen.textContent = '0';
    lastOperationScreen.textContent = '';
    firstNumber = '';
    secondNumber = '';
    operation = null;
}

function calculate() {
  if (operation === null || setResetScreen) return;
  if (operation === "÷" && currentOperationScreen.textContent === "0") {
    alert("You can't devide by 0!");
    return;
  }
  secondNumber = currentOperationScreen.textContent;
  currentOperationScreen.textContent = roundToTwo(operate(
    firstNumber,
    secondNumber,
    operation
  ));
  lastOperationScreen.textContent = `${firstNumber} ${operation} ${secondNumber} =`;
  operation = null;
}

function handleKeyboard(e) {
    if (e.key >= 0 && e.key <= 9) appendNumber(e.key);
    if (e.key === '.') appendPoint(e.key);
    if (e.key === '=' || e.key === 'Enter') calculate();
    if (e.key === 'Escape') clear();
    if (e.key === 'Backspace') unDo();
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key ==='/')
    {
        setOperation(convertOperation(e.key));
    }
}

function unDo() {
    currentOperationScreen.textContent = currentOperationScreen.textContent.toString().slice(0,-1);
}

function convertOperation(operation) {
    if (operation === '+') return '+';
    if (operation === '-') return '−';
    if (operation === '*') return '×';
    if (operation === '/') return '÷';

}
function add(number1, number2) {
  return number1 + number2;
}
function subtract(number1, number2) {
  return number1 - number2;
}
function multiply(number1, number2) {
  return number1 * number2;
}
function devide(number1, number2) {
  return number1 / number2;
}

function operate(number1, number2, operation) {
    number1 = Number(number1);
    number2 = Number(number2);
  if (operation === "+") {
    return add(number1, number2);
  } else if (operation === "−") {
    return subtract(number1, number2);
  } else if (operation === "×") {
    return multiply(number1, number2);
  } else if (operation === "÷") {
    return devide(number1, number2);
  }
}
