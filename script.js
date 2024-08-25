// Select screen and buttons
const screen = document.querySelector('.screen');
const buttons = document.querySelectorAll('button');

let currentInput = '';
let previousInput = '';
let operator = '';

// Add event listeners to buttons
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.dataset.num;

        switch (value) {
            case undefined: // For buttons like = and C that don't have data-num attributes
                switch (button.className) {
                    case 'equal':
                        if (currentInput && previousInput && operator) {
                            calculate();
                        }
                        break;
                    case 'clear':
                        clearScreen();
                        break;
                }
                break;

            case '+':
            case '-':
            case '*':
            case '/':
                if (currentInput !== '') {
                    if (previousInput !== '') {
                        calculate(); // Calculate before applying a new operator
                    }
                    operator = value;
                    previousInput = currentInput;
                    currentInput = ''; // Reset currentInput to capture next number
                    screen.value = previousInput + ' ' + operator;
                }
                break;

            default: // For numbers and the decimal point
                currentInput += value;
                screen.value = currentInput;
                break;
        }
    });
});

// Function to calculate based on the operator
function calculate() {
    let result = 0;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(current)) return;

    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = prev / current;
            break;
    }

    screen.value = result;
    currentInput = result;
    previousInput = '';
    operator = '';
}

// Function to clear the screen
function clearScreen() {
    currentInput = '';
    previousInput = '';
    operator = '';
    screen.value = '';
}
