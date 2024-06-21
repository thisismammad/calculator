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

let answers = [];

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
            let sp = phrase.textContent.split(op);

            num2 = Number(sp[sp.length - 1]);
            console.log("num2 " + num2);
            if (answers.length > 0) {
                num1 = answers[answers.length - 1];
            } else {
                num1 = Number(sp[0]);
            }
            console.log("num1 " + num1);

            answers.push(calculator(num1, num2, op));
            console.log("ans: " + answers);
            clickedOprator = false;
        }
    });

}

ac.addEventListener('click', () => {
    reset();
});

bs.addEventListener('click', () => {
    if(isNaN(Number(phrase.textContent.charAt(phrase.length -1))) === false){
        answers.pop();
    }
    phrase.textContent = phrase.textContent.slice(0, -1);
    result.textContent = "";
    clickedEqual = false;
    if (phrase.textContent.search(/[\+\-\*\/]/g) === -1) {
        clickedOprator = false;
    } else {

        clickedOprator = true;
    }
    if (phrase.textContent === "") {
        phrase.textContent = "0";
    }
});

for (const operator of operators) {
    operator.addEventListener('click', () => {
        if (clickedEqual) {
            phrase.textContent = answers[answers.length - 1];
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
    if (!clickedEqual) {
        if (answers.length === 0) {
            if (!clickedOprator) {
                result.textContent = phrase.textContent;
                answers.push(Number(phrase.textContent));
                phrase.textContent += equal.textContent;
            } else {
                phrase.textContent = phrase.textContent.slice(0, -1);
                answers.push(Number(phrase.textContent));
                result.textContent += phrase.textContent;
                phrase.textContent += equal.textContent;

            }
        } else {
            phrase.textContent += equal.textContent;
        }

        result.textContent = answers[answers.length - 1];
        clickedEqual = true;
    }
});


function reset() {
    phrase.textContent = "0";
    result.textContent = "";
    num1 = 0;
    num2 = 0;
    answers = [];
    ans = 0;
    op = "";
}

function calculator(num1, num2, op) {
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