const log = console.log

const solution = (stones, maxStep) => {
  let min = Infinity
  let max = -Infinity

  for (const stone of stones) {
    min = Math.min(stone, min)
    max = Math.max(stone, max)
  }

  return binarySearchWithCondition(stones, maxStep, min, max)
}

const binarySearchWithCondition = (stones, maxStep, min, max) => {
  if (min === max) return min

  while (min <= max) {
    const mid = Math.floor((min + max) / 2)
    if (canAcross(stones, maxStep, mid)) min = mid + 1
    else max = mid - 1
  }

  return min - 1
}

const canAcross = (stones, maxStep, people) => {
  let capacity = 0

  for (const stone of stones) {
    if (stone - people < 0) {
      capacity += 1
    } else {
      capacity = 0
    }

    if (capacity === maxStep) return false // 연속해서 건넜을 때 K와 같아진다면 false
  }

  return true
}

log(solution([2, 4, 5, 3, 2, 1, 4, 2, 5, 1], 3))
log(solution([1, 1], 1))
// result: 3
