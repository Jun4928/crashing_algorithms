const log = console.log

const solution = (orders, course) => {
  const result = []

  const maxOrderCount = Math.max(...orders.map((order) => order.length))
  course = course.filter((c) => c <= maxOrderCount)

  for (const number of course) {
    const combinations = orders.flatMap((order) => getCombinations([...order], number))
    const menuCount = combinations.reduce(
      ({ count, maxCount }, combination) => {
        const currentCount = count[combination]

        if (currentCount) {
          count[combination] = currentCount + 1

          if (count[combination] >= maxCount) maxCount = count[combination]
        } else count[combination] = 1

        return { count, maxCount }
      },
      { count: {}, maxCount: 0 }
    )

    const menus = Object.entries(menuCount.count)
      .filter(([key, value]) => value === menuCount.maxCount)
      .map(([k]) => k)

    result.push(...menus)
  }

  return result.sort()
}

const getCombinations = (arr, selectNumber) => {
  if (arr.length < selectNumber) return []
  if (selectNumber === 1) return arr.map((value) => [value])

  const results = []

  for (const [index, fixed] of arr.entries()) {
    const rest = arr.slice(index + 1)
    const combinations = getCombinations(rest, selectNumber - 1)
    const attached = combinations.map((c) => [fixed, ...c])
    results.push(...attached)
  }

  return results.map((result) => result.sort().join(''))
}

log(solution(['ABCFG', 'AC', 'CDE', 'ACDE', 'BCFG', 'ACDEH'], [2, 3, 4]))
log(solution(['ABCDE', 'AB', 'CD', 'ADE', 'XYZ', 'XYZ', 'ACD'], [2, 3, 5]))
log(solution(['XYZ', 'XWY', 'WXA'], [2, 3, 4]))
