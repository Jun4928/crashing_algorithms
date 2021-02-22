let max = 0;
const operatorMap = {
  1: "+",
  2: "-",
  3: "*",
};

const calculate = (num1, num2, op) => {
  if (op === "+") {
    return +num1 + +num2;
  } else if (op === "-") {
    return +num1 - +num2;
  } else return +num1 * +num2;
};

const getPrize = (priority, expression) => {
  const splitted = expression.split(/([+*-])/);
  let numbers = [];
  let operators = [];
  for (let i = 0; i < splitted.length; i++) {
    const ex = splitted[i];
    if (ex === "+" || ex === "-" || ex === "*") operators.push(ex);
    else numbers.push(ex);
  }

  for (let i = 0; i < priority.length; i++) {
    let newNumbers = [];
    let newOperators = [];
    const currentOperator = operatorMap[priority[i]];
    for (let j = 0; j < operators.length; j++) {
      if (operators[j] === currentOperator) {
        if (j === 0) {
          newNumbers[0] = calculate(numbers[0], numbers[1], currentOperator);
        } else {
          newNumbers[newNumbers.length - 1] = calculate(
            newNumbers[newNumbers.length - 1],
            numbers[j + 1],
            currentOperator
          );
        }
      } else {
        if (j === 0) newNumbers.push(numbers[j]);
        newNumbers.push(numbers[j + 1]);
        newOperators.push(operators[j]);
      }
    }
    numbers = newNumbers;
    operators = newOperators;
  }
  return numbers[0];
};

const getCombinations = (idx, priority, expression) => {
  if (idx === 3) {
    const [a, b, c] = priority;
    const prize = Math.abs(getPrize(priority, expression));
    if (prize > max) max = prize;
    return;
  }
  for (let i = 1; i <= 3; i++) {
    if (!priority.includes(i)) {
      priority[idx] = i;
      getCombinations(idx + 1, priority, expression);
      priority[idx] = 0;
    }
  }
};

function solution(expression) {
  getCombinations(0, [0, 0, 0], expression);
  return max;
}
