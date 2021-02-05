const log = console.log

const powerSet = (numbers) => {
  let flag = numbers.map((_) => false)
  const powerSets = []

  const DFS = (level) => {
    if (level === numbers.length) {
      const numbersWithFlag = numbers.map((number, idx) => (flag[idx] ? number : number * -1))
      powerSets.push(numbersWithFlag.reduce((a, b) => a + b))
      return
    }

    flag[level] = true
    DFS(level + 1)

    flag[level] = false
    DFS(level + 1)
  }

  DFS(0)
  return powerSets
}

const solution = (numbers, target) => powerSet(numbers).filter((el) => el === target).length

log(solution([1, 1, 1, 1, 1], 3))
