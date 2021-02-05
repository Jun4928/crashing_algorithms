# DFS, BFS 알고리즘

## 타겟 넘버

- 멱집합 알고리즘 응용(DFS)

### 멱집합 알고리즘

- 기본적으로 DFS 를 사용하는 알고리즘이다. level 또는 depth 를 계속해서 깊게 해 나가면서 상태를 바꾸기 때문이다.
- flag 배열의 true, false 가 재귀의 종료 조건에서 배열에 담을지 말지를 결정하는 알고리즘이 된다.

```js
const powerSet = (numbers) => {
  let flag = numbers.map((_) => false)
  const powerSets = []

  const DFS = (level) => {
    if (level === numbers.length) {
      // 재귀의 종료조건
      const numbersWithFlag = numbers.map((number, idx) => (flag[idx] ? number : number * -1)) // flag true / false 여부에 따라 더할지 뺄지를 결정한다.
      powerSets.push(numbersWithFlag.reduce((a, b) => a + b)) // 부호가 생성된 수에 대해 reduce 로 합을 구한다
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
```

## 네트워크

- BFS

### Breadth First Search

- BFS 로 탐색 하기 위해서는 먼저 배열로 들어온 데이터를 객체로 만든다.
- 네트워크의 개수를 구해야 하므로 graph 의 모든 키 값에 대해서 BFS 알고리즘을 적용한다.
- 이미 검색 된 key 값이라면 같은 네트워크에 속해 있는 것이고, 검색 되지 않았으면 다른 네트워크에 속한 노드가 된다.

> 들어온 배열을 graph 객체로 만드는 코드

```js
computers.forEach((edges, currentComputer) => {
  const connectedComputers = edges
    .map((connected, computer) => ({ computer, connected }))
    .filter(({ computer, connected }) => computer !== currentComputer && connected)
    .map(({ computer }) => computer)

  graph[currentComputer] = connectedComputers
})

graph = {
  0: [2, 3],
  1: [4, 5],
  2: [0, 3, 4, 5],
  3: [0, 2, 4, 5],
  4: [1, 2, 3, 5],
  5: [1, 2, 3, 4],
}
```

- key 값이 노드가 되고, value 가 연결된 노드의 정보를 나타낸다.

> 네트워크 수를 구하는 코드

```js
let networks = 0
let visitied = new Array(n).fill(false)

for (const key in graph) {
  if (visitied[key]) continue

  networks += 1
  BFS(key, visitied)
}
```

- visitied 라는 배열을 선언하고, 방문이 되면 true 로 마킹한다.
- BFS key값과 visitied 배열을 인자로 넣어주어서, visited 가 graph의 모든 키값을 순회 할 때 맥락을 공유할 수 있게 해 준다.

> 너비 우선 탐색

```js
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
```

- unvisited 배열을 queue 와 같은형태로 사용한다.
- 방문하지 않은 노드가 남아 있을 때 까지 반복한다.
- 방문 할 때, 이미 방문되어 있다면 continue 로 아래 로직이 실행되지 않게 하고
- 방문하지 않았다면, visitied 배열의 key 값을 true로 바꾸어주고, 연결된 모든 노드들을 unvisited 에 enqueue 한다.
