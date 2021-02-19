const log = console.log

const getAvailablePath = (graph) => {
  let found = undefined

  const DFS = (city, path) => {
    if (found) return

    const connected = graph[city]
    if (!connected || !connected.length) {
      const isAllTicketUsed = Object.values(graph).every(({ length }) => !length)

      if (isAllTicketUsed) {
        found = path
        return
      }

      return
    }

    for (const [idx, arrive] of connected.entries()) {
      graph[city] = connected.filter((_, cityIndex) => cityIndex !== idx)
      DFS(arrive, [...path, arrive])
      graph[city] = connected
    }
  }

  DFS('ICN', ['ICN'])
  return found
}

const solution = (tickets) => {
  const graph = {}

  for (const [city, arrive] of tickets) {
    const connected = graph[city] || []
    graph[city] = [...connected, arrive]
  }

  for (const city in graph) {
    const connected = graph[city]
    graph[city] = connected.sort()
  }

  return getAvailablePath({ ...graph })
}

log(
  solution([
    ['ICN', 'JFK'],
    ['HND', 'IAD'],
    ['JFK', 'HND'],
  ])
)

log(
  solution([
    ['ICN', 'SFO'],
    ['ICN', 'ATL'],
    ['SFO', 'ATL'],
    ['ATL', 'ICN'],
    ['ATL', 'SFO'],
  ])
)

log(
  solution([
    ['ICN', 'SFO'],
    ['SFO', 'ICN'],
    ['ICN', 'SFO'],
    ['SFO', 'QRE'],
  ])
)

log(
  solution([
    ['ICN', 'A'],
    ['ICN', 'B'],
    ['B', 'ICN'],
  ])
)

log(
  solution([
    ['ICN', 'B'],
    ['B', 'ICN'],
    ['ICN', 'A'],
    ['A', 'D'],
    ['D', 'A'],
  ])
)

log(
  solution([
    ['ICN', 'A'],
    ['ICN', 'A'],
    ['A', 'ICN'],
    ['A', 'C'],
  ])
)

log(
  solution([
    ['ICN', 'A'],
    ['ICN', 'A'],
    ['A', 'ICN'],
  ])
)
