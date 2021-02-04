const log = console.log

const solution = (n, computers) => {
  const graph = {}

  computers.forEach((edges, currentComputer) => {
    const connectedComputers = edges
      .map((connected, computer) => ({ computer, connected }))
      .filter(({ computer, connected }) => computer !== currentComputer && connected)
      .map(({ computer }) => computer)

    graph[currentComputer] = connectedComputers
  })

  const BFS = (key, visitied) => {
    const unvisited = [key]

    while (unvisited.length) {
      const currentNode = unvisited.shift()
      if (visitied[currentNode]) continue
      visitied[currentNode] = true

      const connected = graph[currentNode]
      unvisited.push(...connected)
    }
  }

  let networks = 0
  let visitied = new Array(n).fill(false)

  for (const key in graph) {
    if (visitied[key]) continue

    networks += 1
    BFS(key, visitied)
  }

  return networks
}

log(
  solution(3, [
    [1, 1, 0],
    [1, 1, 0],
    [0, 0, 1],
  ])
)
log(
  solution(3, [
    [1, 1, 0],
    [1, 1, 1],
    [0, 1, 1],
  ])
)
log(
  solution(6, [
    [1, 0, 1, 1, 0, 0],
    [0, 1, 0, 0, 1, 1],
    [1, 0, 1, 1, 1, 1],
    [1, 0, 1, 1, 1, 1],
    [0, 1, 1, 1, 1, 1],
    [0, 1, 1, 1, 1, 1],
  ])
)
