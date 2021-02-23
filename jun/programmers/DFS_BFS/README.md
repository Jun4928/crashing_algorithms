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

### 기록하고 싶은 코드

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

## 단어 변환

- BFS 로 최단거리 찾기 문제
- 각 단어가 Key 라고 생각하고 이동할 수 있는 단어들을 연결 해 주는 로직이 필요함

### 기록하고 싶은 코드

> 인자로 들어온 변형 할 단어와 변형 가능한 단어가 나열되어 있는 words 배열을 graph 로 만드는 로직

```js
const graph = {}
const graphKeys = [begin, ...words]

const isOneDiffer = (key, el) => {
  // 한 자리수만 다르면 true 를 반환하도록 한다.
  let sameCount = 0
  const keyArr = [...key]
  keyArr.forEach((char, idx) => {
    sameCount += char === el[idx] ? 1 : 0
  })

  return sameCount >= key.length - 1
}

for (const key of graphKeys) {
  const connected = graphKeys.filter((el) => el !== key && isOneDiffer(key, el)) // 자기 자신이 아니며, 한 글자만 다른 것들을 배열에 담는다. (변형 될 수 있는 단어를 의미한다)
  graph[key] = connected // 변형될 수 있는 단어를 담은 배열을 value 로 해당 단어에 맵핑한다.
}
```

> 최단 거리를 찾는 Breadth First Search

```js
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
```

- 변형 된 횟수를 저장하기 위해서 unvisited queue 에 탐색 할 노드를 담을 때, 객체로 distance 를 함께 enqueue 한다.
- queue 에서 dequeue 를 통해 BFS를 진행한다.
- target 을 가장 먼저 만나는 순간이 가장 짧은 순간이므로 그 때의 distance 를 담고 BFS를 종료한다.
- 미리 방문 헀으면 conitnue 로 탐색이 진행되지 않도록 한다.
- unvisited 에 연결되어 있는 단어들을 넣을 때, 현재 distance에 +1 을 해서 객체의 형태로 담아준다.

## 여행경로

- DFS(깊이 우선 탐색) 알고리즘으로 항공권을 사용할 수 있는 경로를 탐색한다.

### 기록하고 싶은 코드

> 배열로 들어온 티켓에 대해, graph로 관계성을 만들어내는 코드

```js
const solution = (tickets) => {
  const graph = {}

  for (const [city, arrive] of tickets) {
    const connected = graph[city] || []
    graph[city] = [...connected, arrive]
  }

  for (const city in graph) {
    const connected = graph[city]
    graph[city] = connected.sort()
    // 알파벳 순이기 때문에 먼저 정렬 해 놓는다.
  }

  return getAvailablePath({ ...graph })
}
```

> 티켓을 전부 사용해서 여행할 수 있는 경로를 구하는 함수

```js
const getAvailablePath = (graph) => {
  let found = undefined

  const DFS = (city, path) => {
    if (found) return

    const connected = graph[city]
    if (!connected || !connected.length) {
      // 연결된 도시가 없거나, 더 이상 갈 곳이 없다면 재귀 종료 조건
      const isAllTicketUsed = Object.values(graph).every(({ length }) => !length) // graph 로 연결된 모든 도시 들이 방문 되었다면 모든 티켓을 다 사용한 것

      if (isAllTicketUsed) {
        // 이 때, 모든 티켓이 다 사용되었는지 체크해서 맞으면, 티켓을 전부 사용해서 갈 수 있는 여행경로가 됨
        found = path
        return
      }

      return
    }

    for (const [idx, arrive] of connected.entries()) {
      graph[city] = connected.filter((_, cityIndex) => cityIndex !== idx) // 상태를 바꾸고
      DFS(arrive, [...path, arrive]) // DFS 재귀 호출
      graph[city] = connected // 콜 스택이 끝나고 다음 요소에 대해서 DFS를 탐색 할 때, 다시금 원본 상태로 돌려 놓아야 함
    }
  }

  DFS('ICN', ['ICN']) // 문제의 요구사항에 무조건 ICN 출발이기 때문에 초기 값을 ICN 으로 한다.
  return found
}
```

- 이 DFS를 구현 하면서 애를 먹었던 부분은 DFS 함수를 호출하고 원래의 상태로 되돌리는 코드가 없을 때, 원했던 결과를 얻을 수 없었다.
- for 문에서, 갈 수 있는 모든 도시를 방문하기 위해서 도착 도시에 대해서 다시금 DFS 함수를 재귀호출 하고 있는데, 호출이 끝나고 나서 `graph[city] = connected` 원본 배열로 되돌려야 그 다음 재귀 호출에서 유효한 값을 얻어낼 수 있다.

## 배달

- 플로이드-워셜(Floyd-Warhsall) 알고리즘

### 기록하고 싶은 코드

```js
roads.forEach(([col, row, distance]) => {
  const current = graph[col - 1][row - 1]
  graph[col - 1][row - 1] = Math.min(current, distance) // 애초에 최소값을 저장한다.
  graph[row - 1][col - 1] = Math.min(current, distance)
})

for (let mid = 0; mid < N; mid++) {
  // 모든 노드를 중간노드로 하기 위해서 3차원 for 문이 필요하다.
  for (let col = 0; col < N; col++) {
    for (let row = 0; row < N; row++) {
      graph[col][row] = Math.min(graph[col][row], graph[col][mid] + graph[mid][row])
      // 계속해서 최소값을 갱신해 나간다.
      // 본래 저장되어 있는 거리와, 중간 지점을 거친 거리를 비교해서 최소값을 갱신하는 알고리즘이다.
    }
  }
}
```

## 순위

- DFS
- 양방향으로 서로 다른 weight(1, -1) 를 가지도록 하는 graph 를 배열로 만들어야 함
- 부모 + 자식 노드 개수 === n - 1 인 노드가 몇개인지 구하는 문제
- 문제의 요구사항에서 실력이 좋다면 항상 이긴다고 했으니, 경기 결과를 통해서 -> 반대로 나의 부모를 이긴 부모는 나를 항상 이길 것이고, 나에게 진 자식의 자식들은 나에게 지기 때문에 위와 같은 조건이 성립하게 된다.

### 기록하고 싶은 코드

> 배열로 노드간에 관계도를 구성하는 코드

```js
let graph = [...new Array(n)].map((_) => new Array(n).fill(0))

for (const [winner, loser] of results) {
  graph[winner - 1][loser - 1] = 1
  graph[loser - 1][winner - 1] = -1
}
```

```js
const people = [...new Array(n)].map((_, idx) => idx)
// 사람을 노드로 담고

// 부모 자식이 몇개가 되는지 map 함수로 구하고
// filter 로 정답이 되는 조건(부모 노드 + 자식 노드 === n - 1)을 걸러낸다
return people
  .map(
    (person) =>
      getParentsAndChildren(person, 1, graph, n) + getParentsAndChildren(person, -1, graph, n)
  )
  .filter((v) => v === n - 1).length
```

> flag(1 | -1)를 인자로 주어서 부모 또는 자식이 몇개가 되는지 찾아내는 함수

```js
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
```
