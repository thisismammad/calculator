const numbers = document.querySelectorAll('.number');
const phrase = document.querySelector('.phrase')
const result = document.querySelector('.result')
const ac = document.querySelector('.ac');
const bs = document.querySelector('.bs');
const operators = document.querySelectorAll('.operator');
const equal = document.querySelector('.equal');


clickedEqual = false;
let num1 = 0;
let num2 = 0;
let ans = 0;
let op = "";


clickedOprator = false;
for (const number of numbers) {
    number.addEventListener('click', () => {
        if (clickedEqual) {
            reset();
        }
        clickedEqual = false;
        if (phrase.textContent === "0") {
            phrase.textContent = "";
        }

        if (phrase.textContent === "" && number.textContent === ".") {
            phrase.textContent = "0.";
        }
        if (number.textContent === "." && !phrase.textContent.includes(".")) {
            phrase.textContent += number.textContent;
        } else if (number.textContent !== ".") {
            phrase.textContent += number.textContent;
        }
    });

}

ac.addEventListener('click', () => {
    reset();
});

bs.addEventListener('click', () => {
    phrase.textContent = phrase.textContent.slice(0, -1);
    result.textContent = "";
    clickedEqual = false;
    if (phrase.textContent === "") {
        phrase.textContent = "0";
    }
});

for (const operator of operators) {
    operator.addEventListener('click', () => {
        if(clickedEqual){
            phrase.textContent = ans;
            result.textContent = "";
            clickedEqual = false;
        }
        if (!clickedOprator) {
            phrase.textContent += operator.textContent;
            clickedOprator = true;
            op = operator.textContent;
        }
        if (op !== operator.textContent) {
            phrase.textContent = phrase.textContent.slice(0, -1);
            phrase.textContent += operator.textContent;
        }


    });
}


equal.addEventListener('click', () => {
    clickedEqual = true;
    num1 = Number(phrase.textContent.split(op)[0]);
    num2 = Number(phrase.textContent.split(op)[1]);
    switch (op) {
        case "/":
            ans = num1 / num2;
            break;
        case "*":
            ans = num1 * num2;
            break;
        case "-":
            ans = num1 - num2;
            break;
        case "+":
            ans = num1 + num2;
            break;
        default:
            ans = "Invalid";
    }
    phrase.textContent += equal.textContent;
    result.textContent = ans;
    clickedOprator = false;
});


function reset() {
    phrase.textContent = "0";
    result.textContent = "";
    num1 = 0;
    num2 = 0;
    op = "";
}