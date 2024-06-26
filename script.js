const numbers = document.querySelectorAll(".number");
const phrase = document.querySelector(".phrase");
const result = document.querySelector(".result");
const ac = document.querySelector(".ac");
const bs = document.querySelector(".bs");
const operators = document.querySelectorAll(".operator");
const equal = document.querySelector(".equal");

clickedEqual = false;
let num1 = 0;
let num2 = 0;
let ans = 0;
let op = "+";
let secondNumClick = false;

clickedOprator = false;
for (const number of numbers) {
  number.addEventListener("click", () => {
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
    if (
      number.textContent === "." &&
      (!phrase.textContent.includes(".") ||
        phrase.textContent.lastIndexOf(".") <
          phrase.textContent.lastIndexOf(op))
    ) {
      phrase.textContent += number.textContent;
    } else if (number.textContent !== ".") {
      if (number.textContent === "0") {
        if (phrase.textContent[phrase.textContent.length - 1] === "0") {
          if (
            isNaN(phrase.textContent[phrase.textContent.length - 2]) ===
              false ||
            phrase.textContent[phrase.textContent.length - 2] === "."
          ) {
            phrase.textContent += number.textContent;
          }
        } else {
          phrase.textContent += number.textContent;
        }
      } else {
        phrase.textContent += number.textContent;
      }
    }
    clickedOprator = false;
  });
}

ac.addEventListener("click", () => {
  reset();
});

bs.addEventListener("click", () => {
  if (isNaN(phrase.textContent.charAt(phrase.textContent.length - 1))) {
    clickedOprator = false;
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

  if (ans === "Can't divide by zero") {
    reset();
  }
});

for (const operator of operators) {
  operator.addEventListener("click", () => {
    if (clickedEqual) {
      phrase.textContent = ans;
      result.textContent = "";
      clickedEqual = false;
    }
    // // calculator();

    // if (!isNaN(num1) && !isNaN(num2)) {
    //   phrase.textContent = ans;
    //   result.textContent = "";
    // }

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

equal.addEventListener("click", () => {
  if (!clickedEqual) {
    phraseTxt = phrase.textContent;
    if (phraseTxt.search(/[A-Za-z]/g) !== -1) {
      reset();
      result.textContent = "Invalid Input";
    } else {
      let sp = phraseTxt.split(op);

      // result.textContent  = ans

      if (sp[1] === undefined) {
        if (sp[0][sp.length - 1] === ".") {
          sp[0] = sp[0].slice(0, -1);
        } else {
          result.textContent = Number(sp[0]);
          phrase.textContent += equal.textContent;
          ans = Number(sp[0]);
        }
      } else if (sp[1] === "") {
        phrase.textContent = phrase.textContent.slice(0, -1);
        result.textContent = phrase.textContent;
        phrase.textContent += equal.textContent;
        ans = Number(result.textContent);
      } else {
        // calculator();
        if (sp[1] === ".") {
          result.textContent = Number(sp[0]);
          phrase.textContent += equal.textContent;
          ans = Number(sp[0]);
        } else {
          ans = eval(phrase.textContent);
          if (ans === Infinity || isNaN(ans)) {
            ans = "Can't divide by zero";
          } else if (!Number.isInteger(ans) && ans.toString().length > 10) {
            ans = ans.toFixed(10);
          }
          phrase.textContent += equal.textContent;
          result.textContent = ans;
        }
      }
    }
    clickedEqual = true;
    clickedOprator = false;
  }
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
  op = "+";
}

// function calculator() {
//   let index = phrase.textContent.lastIndexOf(op);
//   num1 = Number.parseFloat(phrase.textContent.substring(0, index));
//   num2 = Number.parseFloat(phrase.textContent.substring(index + 1));
//   if (!isNaN(num1) && !isNaN(num2)) {
//     switch (op) {
//       case "/":
//         ans = num1 / num2;
//         break;
//       case "*":
//         ans = num1 * num2;
//         break;
//       case "-":
//         ans = num1 - num2;
//         break;
//       case "+":
//         ans = num1 + num2;
//         break;
//       default:
//         ans = "Invalid";
//     }
//     clickedOprator = false;
//     if (ans === Infinity || isNaN(ans)) {
//       ans = "Can't divide by zero";
//     } else if (!Number.isInteger(ans) && ans.toString().length > 10) {
//       ans = ans.toFixed(10);
//     }
//   }
// }
