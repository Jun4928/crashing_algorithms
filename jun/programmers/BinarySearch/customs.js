const log = console.log

const solution = (people, times) => {
  const max = Math.ceil(people / times.length) * Math.max(...times)
  const min = Math.min(...times)

  return binarySearchWithCondition(people, times, min, max)
}

const binarySearchWithCondition = (people, times, min, max) => {
  if (min === max) return max

  while (min <= max) {
    const mid = Math.floor((max + min) / 2)
    if (isPossible(people, times, mid)) max = mid - 1
    else min = mid + 1
  }

  return max + 1
}

const isPossible = (people, times, minutes) => {
  const capacity = times.map((time) => Math.floor(minutes / time)).reduce((a, b) => a + b, 0)
  return people <= capacity
}

log(solution(6, [7, 10]))
log(solution(7, [8, 7, 10]))
