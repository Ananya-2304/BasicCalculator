let display = document.getElementById("display");
let currentValue = "";
let previousValue = "";
let operator = null;

// Handling button clicks
const buttons = document.querySelectorAll("button");

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.textContent;

        if (button.classList.contains("digit")) {
            handleDigit(value);
        } else if (button.classList.contains("operator")) {
            handleOperator(value);
        } else if (value === ".") {
            handleDecimal();
        } else if (value === "=") {
            handleEquals();
        } else if (value === "C") {
            clear();
        }
    });
});

// Handling digits
function handleDigit(digit) {
    if (currentValue === "0" && digit === "0") return;
    currentValue += digit;
    updateDisplay();
}

// Handling operators
function handleOperator(op) {
    if (currentValue === "") return;
    if (operator !== null) handleEquals();
    previousValue = currentValue;
    currentValue = "";
    operator = op;
    updateDisplay();
}

// Handling decimal points
function handleDecimal() {
    if (!currentValue.includes(".")) {
        currentValue += ".";
        updateDisplay();
    }
}

// Handling equals button
function handleEquals() {
    if (operator === null || currentValue === "") return;

    const prev = parseFloat(previousValue);
    const curr = parseFloat(currentValue);
    let result;

    switch (operator) {
        case "+":
            result = prev + curr;
            break;
        case "-":
            result = prev - curr;
            break;
        case "*":
            result = prev * curr;
            break;
        case "/":
            result = curr === 0 ? "Error" : prev / curr;
            break;
        default:
            return;
    }

    currentValue = result.toString();
    operator = null;
    previousValue = "";
    updateDisplay();
}

// Clearing the display
function clear() {
    currentValue = "";
    previousValue = "";
    operator = null;
    updateDisplay("0");
}

// Updating the display to show the current value and operator (if any)
function updateDisplay() {
    if (operator !== null && currentValue === "") {
        display.textContent = `${previousValue} ${operator}`;
    } else if (operator !== null) {
        display.textContent = `${previousValue} ${operator} ${currentValue}`;
    } else {
        display.textContent = currentValue || "0";
    }
}
