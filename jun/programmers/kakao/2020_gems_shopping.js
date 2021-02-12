const log = console.log

const solution = (gems) => {
  const gemsSet = new Set(gems)
  const gemsCount = gemsSet.size
  const gemsLength = gems.length
  let left = 0
  let right = 0
  let answer = [0, gemsLength - 1]

  const gemHash = new Map()
  gemHash.set(gems[right], 1)

  while (right < gemsLength && left <= right) {
    const isAllIncluded = gemHash.size === gemsCount

    if (isAllIncluded) {
      const leftGemCount = gemHash.get(gems[left]) - 1
      leftGemCount !== 0 ? gemHash.set(gems[left], leftGemCount) : gemHash.delete(gems[left])

      if (right - left < answer[1] - answer[0]) answer = [left, right]
      left += 1
    } else {
      right += 1
      const rightGemCount = gemHash.get(gems[right])
      gemHash.set(gems[right], rightGemCount ? rightGemCount + 1 : 1)
    }
  }

  return answer.map((el) => el + 1)
}

log(solution(['DIA', 'RUBY', 'RUBY', 'DIA', 'DIA', 'EMERALD', 'SAPPHIRE', 'DIA'])) // 3, 7
log(solution(['AA', 'AB', 'AC', 'AA', 'AC'])) // 1, 3
log(solution(['XYZ', 'XYZ', 'XYZ'])) // 1, 1
log(solution(['ZZZ', 'YYY', 'NNNN', 'YYY', 'BBB'])) // 1, 5
log(solution(['A', 'A', 'B', 'A', 'B', 'A'])) // 2, 3
