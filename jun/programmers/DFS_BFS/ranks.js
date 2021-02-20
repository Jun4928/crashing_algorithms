const log = console.log

const solution = (n, results) => {
  let graph = [...new Array(n)].map((_) => new Array(n).fill(0))

  for (const [winner, loser] of results) {
    graph[winner - 1][loser - 1] = 1
    graph[loser - 1][winner - 1] = -1
  }

  const people = [...new Array(n)].map((_, idx) => idx)

  return people
    .map(
      (person) =>
        getParentsAndChildren(person, 1, graph, n) + getParentsAndChildren(person, -1, graph, n)
    )
    .filter((v) => v === n - 1).length
}

const getParentsAndChildren = (person, flag, graph, n) => {
  let related = 0
  let visited = new Array(n).fill(false)

  const DFS = (person, flag) => {
    const connected = graph[person]

    for (let i = 0; i < connected.length; i++) {
      if (connected[i] === flag && !visited[i]) {
        related += 1
        visited[i] = true
        DFS(i, flag)
      }
    }

    return
  }

  DFS(person, flag)
  return related
}

log(
  solution(5, [
    [4, 3],
    [4, 2],
    [3, 2],
    [1, 2],
    [2, 5],
  ])
) // 2
