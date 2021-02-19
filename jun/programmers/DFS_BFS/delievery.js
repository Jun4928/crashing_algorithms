const log = console.log
const PriorityQueue = require('../../data_structures/PriorityQueue')

const solution = (N, roads, K) => {
  let graph = [...new Array(N)].map((_, col) =>
    [...new Array(N)].map((_, row) => (col === row ? 0 : Infinity))
  )
  roads.forEach(([col, row, distance]) => {
    const current = graph[col - 1][row - 1]
    graph[col - 1][row - 1] = Math.min(current, distance)
    graph[row - 1][col - 1] = Math.min(current, distance)
  })
  for (let mid = 0; mid < N; mid++) {
    for (let col = 0; col < N; col++) {
      for (let row = 0; row < N; row++) {
        graph[col][row] = Math.min(graph[col][row], graph[col][mid] + graph[mid][row])
      }
    }
  }
  return graph[0].filter((distance) => distance <= K).length
}

const solutionWithDijkstra = (N, roads, K) => Dijkstra(roads, N).filter((dist) => dist <= K).length

const Dijkstra = (roads, N) => {
  const queue = new PriorityQueue()
  queue.enqueue(0, 1) // cost가 0인 1번 노드부터 시작

  let dist = new Array(N + 1).fill(Infinity)
  dist[1] = 0

  while (!queue.isEmpty()) {
    const { key: currentCost, value: current } = queue.dequeue()

    for (const [src, dest, cost] of roads) {
      const nextCost = cost + currentCost

      if (src === current && nextCost < dist[dest]) {
        dist[dest] = nextCost
        queue.enqueue(nextCost, dest)
      }

      if (dest === current && nextCost < dist[src]) {
        dist[src] = nextCost
        queue.enqueue(nextCost, src)
      }
    }
  }

  return dist
}

log(
  solution(
    5,
    [
      [1, 2, 1],
      [2, 3, 3],
      [5, 2, 2],
      [1, 4, 2],
      [5, 3, 1],
      [5, 4, 2],
    ],
    3
  )
) // 4
log(
  solution(
    6,
    [
      [1, 2, 1],
      [1, 3, 2],
      [2, 3, 2],
      [3, 4, 3],
      [3, 5, 2],
      [3, 5, 3],
      [5, 6, 1],
    ],
    4
  )
) // 4

log(
  solutionWithDijkstra(
    5,
    [
      [1, 2, 1],
      [2, 3, 3],
      [5, 2, 2],
      [1, 4, 2],
      [5, 3, 1],
      [5, 4, 2],
    ],
    3
  )
) // 4
log(
  solutionWithDijkstra(
    6,
    [
      [1, 2, 1],
      [1, 3, 2],
      [2, 3, 2],
      [3, 4, 3],
      [3, 5, 2],
      [3, 5, 3],
      [5, 6, 1],
    ],
    4
  )
) // 4
