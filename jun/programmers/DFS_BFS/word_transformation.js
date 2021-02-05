const log = console.log

const solution = (begin, target, words) => {
  if (!words.includes(target)) return 0

  const graph = {}
  const graphKeys = [begin, ...words]

  const isOneDiffer = (key, el) => {
    let sameCount = 0
    const keyArr = [...key]
    keyArr.forEach((char, idx) => {
      sameCount += char === el[idx] ? 1 : 0
    })

    return sameCount >= key.length - 1
  }

  for (const key of graphKeys) {
    const connected = graphKeys.filter((el) => el !== key && isOneDiffer(key, el))
    graph[key] = connected
  }

  const visited = {}
  const unvisitied = [{ key: begin, distance: 0 }]

  let shortestDistance
  while (unvisitied.length) {
    const { key, distance } = unvisitied.shift()

    if (visited[key]) continue
    if (key === target) {
      shortestDistance = distance
      break
    }

    visited[key] = true

    const connected = graph[key].map((key) => ({ key, distance: distance + 1 }))
    unvisitied.push(...connected)
  }

  return shortestDistance
}

log(solution('hit', 'cog', ['hot', 'dot', 'dog', 'lot', 'log', 'cog'])) // 4
log(solution('hit', 'cog', ['hot', 'dot', 'dog', 'lot', 'dog'])) // 0
log(solution('hit', 'cog', ['cog', 'log', 'lot', 'dog', 'dot', 'hot'])) // 4
