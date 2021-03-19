// const log = console.log

// const OPERATOR = new RegExp(/\*|\+|\-/, 'gi')

// const getPermutations = (arr, count) => {
//   if (count === 1) return arr.map((v) => [v])

//   const result = []

//   arr.forEach((el, idx) => {
//     const sliced = [...arr.slice(0, idx), ...arr.slice(idx + 1)]
//     const permutations = getPermutations(sliced, count - 1)
//     const attched = permutations.map((p) => [el, ...p])
//     result.push(...attched)
//   })

//   return result
// }

// const solution = (expression) => {
//   const operators = expression.match(OPERATOR)
//   const operands = expression.split(OPERATOR).map((v) => Number(v))

//   const operatorTypes = new Set(operators)
//   const permutations = getPermutations([...operatorTypes], operatorTypes.size)

//   const results = permutations.map((p) => {
//     let numbers = [...operands]
//     let ops = [...operators]
//     for (const op of p) [numbers, ops] = execute(numbers, ops, op)
//     const [result] = numbers
//     return result > 0 ? result : result * -1
//   })

//   return Math.max(...results)
// }

// const execute = (operands, operators, operator) => {
//   const job = (operator, num1, num2) => {
//     const operatorMapper = {
//       '+': num1 + num2,
//       '-': num1 - num2,
//       '*': num1 * num2,
//     }

//     return operatorMapper[operator]
//   }

//   let foundOperatorIdx = operators.findIndex((op) => op === operator)
//   while (foundOperatorIdx > -1) {
//     const done = job(
//       operators[foundOperatorIdx],
//       operands[foundOperatorIdx],
//       operands[foundOperatorIdx + 1]
//     )

//     operators.splice(foundOperatorIdx, 1)
//     operands.splice(foundOperatorIdx, 2, done)

//     foundOperatorIdx = operators.findIndex((op) => op === operator)
//   }

//   return [operands, operators]
// }

// log(solution('100-200*300-500+20')) // 60420
// log(solution('50*6-3*2')) // 300

// 2nd time

const log = console.log

const getPermutations = (arr, count) => {
  if (count === 1) return arr.map((v) => [v])
  const result = []

  arr.forEach((el, idx) => {
    const sliced = [...arr.slice(0, idx), ...arr.slice(idx + 1)]
    const permutations = getPermutations(sliced, count - 1)
    const attched = permutations.map((p) => [el, ...p])
    result.push(...attched)
  })

  return result
}

const OPERATOR = /[\+\-\*]/g

const getResult = (operands, operators, priority) => {
  const execute = (operator, idx) => {
    const job = {
      '+': operands[idx] + operands[idx + 1],
      '-': operands[idx] - operands[idx + 1],
      '*': operands[idx] * operands[idx + 1],
    }

    return job[operator]
  }

  priority.forEach((operator) => {
    let foundIndex = operators.findIndex((v) => v === operator)
    while (foundIndex !== -1) {
      operators.splice(foundIndex, 1)
      const executed = execute(operator, foundIndex)
      operands.splice(foundIndex, 2, executed)
      foundIndex = operators.findIndex((v) => v === operator)
    }
  })

  return operands
}

const solution = (expression) => {
  const operands = expression.split(OPERATOR).map((v) => Number(v))
  const operators = expression.match(OPERATOR)
  const operatorsSet = new Set(operators)

  const permutations = getPermutations([...operatorsSet], operatorsSet.size)

  let maxResult = -Infinity
  for (const priority of permutations) {
    let [result] = getResult([...operands], [...operators], priority)
    result = result < 0 ? result * -1 : result
    maxResult = result > maxResult ? result : maxResult
  }

  return maxResult
}

log(solution('100-200*300-500+20')) // 60420
log(solution('50*6-3*2')) // 300
