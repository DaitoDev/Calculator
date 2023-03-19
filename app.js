// Grabbing display text
const displayTxt = document.querySelector("h1");

// Grabbing all buttons
const inputBtns = document.querySelectorAll("button");

// Grabbing Eraser button
const eraseBtn = document.querySelector(".clear-btn");

// Grabbing Enter button
const enterBtn = document.querySelector(".equal-btn");

// Grabbing clear all button
const clearAll = document.querySelector(".clear-all");

// Global arrays
const displayTxtArray = [];
let displayValue = "";
let firstValue = 0;
let operatorValue = "";

// Handling display and array manipulation
const setDisplay = () => {
  //   turns array into a string
  let displayStr = displayTxtArray.toString();
  //   Removes all commas from string
  let newStr = displayStr.replaceAll(",", "");
  //   Sets the display inner text to be new string
  displayTxt.innerText = Number(newStr);
  // adds entered number to global var
  displayValue = Number(newStr);
};

const sendNumValue = (n) => {
  // Pushes value to global array
  displayTxtArray.push(n);
  //   Formats array and send for display
  setDisplay();
};

// If operator clicked, clears array and sends new value
const operatorHandler = (operator) => {
  const currentValue = Number(displayTxt.innerHTML);

  //   if no value then assign
  if (!firstValue) {
    firstValue = currentValue;
    awaitNextValue = true;
    displayTxtArray.length = 0;
  } else {
    displayTxt.innerText.replace(firstValue, currentValue);
  }
  //   Assign operator to its global variable im sorry guys this is a mess lmao
  operatorValue = operator;
};

// handles the operators function
const returnValue = (num1 = 0, opr = "+", num2 = 0) => {
  if (opr === "/") {
    return num1 / num2;
  } else if (opr === "*") {
    return num1 * num2;
  } else if (opr === "-") {
    return num1 - num2;
  } else if (opr === "+") {
    return num1 + num2;
  } else if (opr === "%") {
    return num1 % num2;
  }
};

// handling double decimal
const decimalHandler = (n) => {
  if (displayTxtArray.at(-1) !== ".") {
    sendNumValue(n);
  }
};

// Reset All except display
const reset = () => {
  displayValue = "";
  displayTxtArray.length = 0;
  awaitNextValue = false;
  firstValue = 0;
  operatorValue = "";
};

// ============== EVENT LISTENERS =====================
inputBtns.forEach((inputbtn) => {
  inputbtn.addEventListener("click", () => {
    if (inputbtn.classList.contains("num")) {
      sendNumValue(inputbtn.value);
    } else if (inputbtn.classList.contains("operator")) {
      operatorHandler(inputbtn.value);
    } else if (inputbtn.classList.contains("decimal")) {
      decimalHandler(".");
    }
  });
});

// Erase btn
eraseBtn.addEventListener("click", () => {
  displayTxtArray.pop();
  setDisplay();
});

// Clear all btn
clearAll.addEventListener("click", () => {
  displayTxt.innerText = "0";
  reset();
});

// Enter button
enterBtn.addEventListener("click", () => {
  if (operatorValue) {
    let results = returnValue(firstValue, operatorValue, displayValue);
    firstValue = results;
    displayTxt.innerText = results;
    reset();
  }
});
