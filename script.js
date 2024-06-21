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
let secondNumClick = false;

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


        if (clickedOprator) {
            calculator();
            clickedOprator = false;
            secondNumClick = true;
        }
    });

}

ac.addEventListener('click', () => {
    reset();
});

bs.addEventListener('click', () => {
    if (isNaN(phrase.textContent.charAt(phrase.textContent.length - 1))) {
        clickedOprator = false;
    } else {
        clickedOprator = true;
    }
    phrase.textContent = phrase.textContent.slice(0, -1);
    result.textContent = "";
    clickedEqual = false;
    if (phrase.textContent.split(op).length === 1) {
        ans = Number(phrase.textContent);
    }
    if (phrase.textContent === "") {
        phrase.textContent = "0";
        reset();
    }
});

for (const operator of operators) {
    operator.addEventListener('click', () => {
        if (clickedEqual) {
            phrase.textContent = ans;
            result.textContent = "";
            clickedEqual = false;
        }
        if (secondNumClick) {
            phrase.textContent = ans;
            secondNumClick = false;
        }
        if (!clickedOprator) {
            phrase.textContent += operator.textContent;
            clickedOprator = true;
            op = operator.textContent;

        } else if (op !== operator.textContent) {
            phrase.textContent = phrase.textContent.slice(0, -1);
            phrase.textContent += operator.textContent;
            op = operator.textContent;
        }


    });
}


equal.addEventListener('click', () => {
    if (!clickedEqual) {
        let sp = phrase.textContent.split(op);
        if (sp[1] === undefined) {
            result.textContent = phrase.textContent;
            phrase.textContent += equal.textContent;
        } else if (sp[1] === '') {
            phrase.textContent = phrase.textContent.slice(0, -1);
            result.textContent = phrase.textContent;
            phrase.textContent += equal.textContent;
            ans = Number(result.textContent);
        } else {
            phrase.textContent += equal.textContent;
            result.textContent = ans;
        }

    }
    clickedEqual = true;

});


function reset() {
    phrase.textContent = "0";
    result.textContent = "";
    clickedOprator = false;
    clickedEqual = false;
    secondNumClick = false;
    num1 = 0;
    num2 = 0;
    ans = 0;
    op = "";
}

function calculator() {
    let sp = phrase.textContent.split(op);
    num1 = Number(sp[0]);
    num2 = Number(sp[1]);
    console.log(num1, num2, op);
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
    clickedOprator = false;

    return ans
}