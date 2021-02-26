# KAKAO 문제풀이

## 2021 Kakao 신규 아이디 추천

- 특정 알고리즘이 필요하지 않은 문제
- 정규 표현식으로 문자 파싱해서 치환하는 것이 핵심

### 핵심 정규표현식

```js
const ALLOWED = /[^-_.a-z0-9]/g
const DOTS_MORE_THAN_TWO = /\.{2,}/g
const FIRST_AND_LAST_DOT = /^\.|\.$/
```

### 기록하고 싶은 코드

> **마지막 문자 limit 까지 반복하는 함수**

```js
const repeatLast = curry((limit, str) => {
  const repeat = (str) => {
    if (str.length >= limit) return str
    else return repeat(str.concat('', str[str.length - 1]))
  }

  return repeat(str)
})
```

> **str.replace 함수 커링하기**

```js
const replace = curry(({ parser, replacement }, str) => str.replace(parser, replacement)
```

> **최종 답안을 얻어내는 함수들의 조합**

```js
const solution = (newId) =>
  go(
    newId,
    toLowerCase,
    replace({ parser: ALLOWED, replacement: '' }),
    replace({ parser: DOTS_MORE_THAN_TWO, replacement: '.' }),
    replace({ parser: FIRST_AND_LAST_DOT, replacement: '' }),
    ifEmpty,
    isLonger,
    replace({ parser: FIRST_AND_LAST_DOT, replacement: '' }),
    repeatLast(3)
  )
```

## 2021 Kakao 메뉴 리뉴얼

- 조합 알고리즘
- 문자열, 배열, 객체, Array methods Chaining

### 조합 알고리즘

- 핵심은 재귀를 사용하는 것
- 선택하는 숫자를 줄이면서 1이 되었을 때를 재귀의 종료조건으로 한다
- 때문에 고정되어 있는 원소를 제외한 나머지 뒤의 원소에 대해서 조합을 구하고, 붙여나간다.
- 문제에서 사전식으로 오름차순이 되기를 원하기 때문에 함수의 리턴문에서 조합에 대해서 오름차순으로 정렬하고 문자열로 만든 후 리턴 하도록 한다.

```js
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
```

### 기록하고 싶은 코드

> **flatMap으로 조합을 구하고 난 후 배열을 1차원으로 만들기**

```js
const combinations = orders.flatMap((order) => getCombinations([...order], number))
```

> **배열의 원소에 대한 카운트된 객체와, 가장 높은 빈도수를 리턴하는 reduce 함수**

```js
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
```

> **카운트 된 객체에서 가장 높은 빈도수의 원소들만 배열에 담기**

```js
const menus = Object.entries(menuCount.count)
  .filter(([key, value]) => value === menuCount.maxCount)
  .map(([k]) => k
```

## 2021 Kakao 순위 검색

- 멱집합 알고리즘
- 효율성을 위한 Binary Search

### 멱집합 알고리즘

```js
const getSubsets = (arr) => {
  let flag = new Array(arr.length).fill(false)
  const subSets = []

  const subSet = (depth) => {
    if (depth === arr.length) {
      // 재귀 종료조건
      const sub = arr.map((val, idx) => (flag[idx] ? val : '-')).join('')
      subSets.push(sub)
      return
    }

    flag[depth] = true
    subSet(depth + 1)

    flag[depth] = false
    subSet(depth + 1)
  }

  subSet(0) // level 0 부터 시작해서 depth 는 배열의 길이만큼 깊어진다.
  return subSets
}
```

- flag 를 사용해서 재귀로 콜 스택 쌓고, 가장 마지막 일 때 flag 의 상태를 보고 조합을 만들어 내는 알고리즘
- 문제에서 **그룹** 을 만들어 내야 하는데, 한 명의 지원자가 16개의 조합의 그룹에 속하기 때문에 멱집합 알고리즘을 써서, 그룹화를 해야한다.

### Binary Search

```js
const binarySearch = curry((target, arr) => {
  if (!arr) return -1
  let left = 0
  let right = arr.length - 1

  let mid
  while (left <= right) {
    mid = Math.floor((left + right) / 2)
    if (target ==== arr[mid]) return mid
    if (target < arr[mid]) right = mid - 1
    if (arr[mid] < target) left = mid + 1
  }

  return -1
})
```

- 기본적으로 이진탐색 알고리즘은 오름차순으로 정렬된 배열에 대해서 원하는 수를 찾을 때 아주 용이하다.
- 앞에서부터 쭉 찾으면 O(n) 이 되는 일반적인 탐색에 비해, 계속해서 left 와 right 의 중간값으로 찾으려고 하는 값이 어디에 있는지 찾아 나간다. 최종적인 복잡도는 O(logn) 이 된다.

### Binary Search with Lower Bound

```js
const binarySearchLowerBound = curry((target, arr) => {
  if (!arr) return 0
  let min = 0
  let max = arr.length - 1

  while (min <= max) {
    const mid = Math.floor((min + max) / 2)
    if (target <= arr[mid]) max = mid - 1
    if (arr[mid] < target) min = mid + 1
  }

  if (arr[min] >= target) return arr.length - min
  return 0
})
```

- 문제의 요구조건에 의해 일반적인 이진탐색 알고리즘에서 다음과 같이 두 가지를 변경했다.

1. **target 보다 높은 값** 을 찾기 때문에 lower bound 를 적용함. lower bound 이기 때문에 while 문이 종료 된 시점에 left 인덱스를 가지는 요소가 타겟보다 크거나 같은지 검사한다.
2. index를 내뱉지 않고, 타겟보다 높은 최초의 값부터 배열의 끝까지의 길이를 리턴한다.

### 기록하고 싶은 코드

> reduce 함수에 커링을 적용하기 위해서 초기값을 넣어주는 L.prepend 함수

```js
L.prepend = curry(function* (val, iter) {
  yield val
  yield* iter
})

const scoresGroupBy = go(
  info,
  L.map(split(' ')),
  L.prepend(new Map()), // 초기값을 넣고 밑의 리듀스에서 초기 acc 가 되도록 한다.
  reduce((scoresGroupBy, info) => {
    const score = info.pop()
    const subSets = getSubsets(info)

    for (const key of subSets) {
      const currentScores = scoresGroupBy.get(key)
      if (currentScores) {
        currentScores.push(Number(score))
        scoresGroupBy.set(key, currentScores)
      } else scoresGroupBy.set(key, [Number(score)])
    }

    return scoresGroupBy
  })
)
```

## 2019 Kakao 인턴쉽 징검다리 건너기

- 연결 리스트로 접근해서 정확성은 통과 했지만, 효율성 에서 fail
- 파라메트릭 서치(Parametric Search)를 사용해서 효율성 문제를 해결

### Parametric Search

- [Parametric Search Reference](https://ialy1595.github.io/post/parametric-search/)

파라메트릭 서치의 핵심은 이분탐색이다. 이분탐색은 정렬된 배열에서 타겟 값을 찾기 위해 양쪽을 저울질 하는 검색 알고리즘이다.
파라메트릭 서치는 최적의 해를 찾아 나가기 위해서 이분탐색의 아이디어를 차용한다.
주어진 문제를 **결정문제**로 변형한다는 것이 핵심이다.

주어진 문제를 결정문제로 변형해서 파라메트릭 서치를 적용할 때 다음의 조건이 만족해야 한다.

1. **특정 조건**을 만족하는 최대값/최솟값 구하는 형식의 문제에 적용된다.
2. **조건을 만족**하는 최솟값을 구하는 경우에 이보다 큰 값은 모두 조건을 만족해야 한다. 반대로 최대값을 구하는 경우에는 이보다 작은값은 모두 조건을 만족한다.

징검다리 문제에서도 이를 적용할 수 있다.
다리를 건널 수 있는 친구들의 최소값과 최대값 사이에서 조건을 만족하는 최대값을 구하면 된다.

징검 다리를 건널 수 있는 친구들의 최소값과 최대값은 인자로 들어오는 `stones` 배열의 최소값과 최대값과 같다. 왜냐하면 길을 건너는 친구가 돌을 밟을 때마다 -1이 되기 때문이다. 그리고 기본적으로 한 칸씩 움직이는 것이 규칙이고, 건너 뛸 수 있는 칸수가 함수의 인자로 변경되기 때문이다.

이것이 핵심이다. 이 건너 뛸 수 있는 칸수의 조건을 만족 하는 사람의 수를 구하면 된다.

1. **특정 조건**을 만족하는 **최대값**을 구하는 형식의 문제가 되었다.
2. 그리고, 조건을 친구들의 최대값을 구하면 그 아래 사람수는 무조건 다리를 건널 수 있게 된다. 즉 조건을 만족한다는 이야기다.

> binarySearchWithCondition(=Parametric Search)

```js
const binarySearchWithCondition = (stones, maxStep, min, max) => {
  if (min === max) return min

  while (min <= max) {
    // 교차되는 지점이 검색을 종료하는 시점이다.
    const mid = Math.floor((min + max) / 2)
    if (canAcross(stones, maxStep, mid)) min = mid + 1
    // 조건을 만족하면 최소값을 현재의 사람수보다 +1 증가 시킨다.
    else max = mid - 1 // 조건을 만족하지 않으면 최대값을 현재의 사람수보다 -1 감소 시킨다.
  }

  return min - 1 // 파라메트릭 검색 결과 최종적인 최소값이 문제에서 구하고자 하는 다리를 건널 수 있는 최대 사람수가 된다. 그 이하의 사람들은 모두 다 다리를 건널 수 있게 되기 때문이다.
}
```

> 조건을 구하는 함수 canArcross

```js
const canAcross = (stones, maxStep, people) => {
  let capacity = 0

  for (const stone of stones) {
    if (stone - people < 0) {
      // 현재 사람의 수를 빼서
      capacity += 1 // 돌이 음수가 될 때 => 건너 뛸 수 있는 돌의 개수와 비교하기 위해서 1을 증가시킨다.
    } else {
      capacity = 0
    }

    if (capacity === maxStep) return false // 연속해서 건넜을 때 K와 같아진다면 false
  }

  return true
}
```

## 2021 Kakao 합승 택시 요금

- 객체로 graph 를 직접 구현해서 모든 지점간의 거리의 최소값을 구하려고 했으나 **중간지점** 을 모두 고려해야 해서 접근의 어려움을 느낌
- 플로이드-워셜(Floyd-Warhsall) 알고리즘을 통해서 중간 지점을 모두 고려하고 최종적인 최소값을 저장해 놓는 2차원 배열을 구해야 한다.

### Floyd-Warshall 알고리즘

```js
for (let mid = 0; mid < n; mid++) {
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      graph[i][j] = Math.min(graph[i][j], graph[i][mid] + graph[mid][j])
    }
  }
}
```

- 중간 지점이 될 노드를 mid 라고 하고 선택된 중간지점을 기점으로 2차원 인접 행렬을 돌면서 최소값을 갱신한다.
- 기존의 i부터 j 지점까지의 거리와 중간지점을 거친 거리를 비교해서 최소값을 갱신한다.

이렇게 모든 중간지점을 거치고 나서 구해진 최소값이 저장된 배열에 대해서 다음과 같이 인자로 들어온 시작점으로부터 모든 중간지점을 거쳐 a와 b까지 가는 거리에 대해 최소값을 구해주면 된다.

```js
for (let k = 0; k < n; k++) {
  min = Math.min(min, graph[s - 1][k] + graph[k][a - 1] + graph[k][b - 1])
}
```

### 기록하고 싶은 코드

> 최소값을 저장하기 위해 노드간 인접행렬 (2차원 배열) 만들기

```js
const graph = [...new Array(n)].map((_, row) =>
  [...new Array(n)].map((__, column) => (row === column ? 0 : Infinity))
```

> 인접 행렬에 지점간의 거리를 저장하는 코드

```js
fares.forEach(([point1, point2, fare]) => {
  graph[point1 - 1][point2 - 1] = fare
  graph[point2 - 1][point1 - 1] = fare
}
```

## 2018 Kakao 프렌즈4블록

- 주어진 문제의 요구사항을 해결하는 문제
- 처음 인자로 들어온 board 배열을 2차원 배열로 뒤집어 만들기
- 특정한 알고리즘은 없지만 2차원 배열을 다루는데 있어서 시간을 줄여야 함
- 2X2 마스크를 만들어서, 갱신되는 2차원 배열에 대해서 지울 것이 있는지, 없는지 확인한다.

### 기록하고 싶은 코드

> 들어온 board 배열을 2차원 배열로 뒤집어서 만들기

```js
let stacks = [...new Array(n)].map((_, row) =>
  [...new Array(m)].map((_, column) => board[column][row]).reverse()
)
```

> 2차원 배열의 요소가 모두 같은지 확인하는 함수

```js
const isAllSame = ([first, second]) => first.every((a) => a && second.every((b) => a === b))
```

> 삭제된 배열에 대해서 끝까지 undefined 를 채우는 함수

```js
const fillLast = (arr, length) => [...new Array(length)].map((_, idx) => arr[idx])
```

> 2차원 배열과 똑같은 배열을 만들어서 지워지는 요소에 대한 부울린을 저장하는 코드

```js
let deletedBoard = [...new Array(n).fill(true)].map((_) => new Array(m).fill(true))
```

## Kakao 2020 인턴쉽 보석 쇼핑

- 처음에 sliding window 로 접근 했으나, 검사하는 window 사이즈가 계속해서 변경되기 때문에 어려움을 겪었음
- two pointer 전략으로, left, right 의 구간을 변경하면서 조건을 만족하는 구간을 찾아야 한다.
- 성능을 위해 JavaScript 의 Object 가 아닌, Map 자료구조를 사용해야 한다.

### Two pointer

> two pointer 를 사용한 핵심 로직

```js
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
```

- while(right 포인터가 보석배열의 끝에 다다랐을 때, 그리고 left 포인터와 right 포인터가 같아지는 지점까지) 다음 로직을 반복한다.

1. 현재 구간에 모든 보석이 들어있는지 검사한다.
2. 모든 보석이 들어있다면 left 포인터를 하나 증가 시킨다. 이 때, left 포인터에 있는 보석을 Map 에서 하나만큼 감소 시키거나 0 이 되면 완전히 삭제한다.
3. 모든 보석이 들어있지 않다면, right 포인터를 하나 증가시키고, 이 포인터에 담긴 보석의 개수를 Map 에 증가 시킨다.

## Kakao 2020 인턴쉽 수식 최대화

- Permutation (조합) 알고리즘
- 문자열, 배열 처리

### 기록하고 싶은 코드

> 구해진 수식 조합에 대해서 계산 결과를 얻어내는 로직

```js
const permutations = getPermutations([...operatorTypes], operatorTypes.size)

const results = permutations.map((p) => {
  let numbers = [...operands]
  let ops = [...operators]
  // 연산자들의 수선순위가 담긴 p 배열에 대해서 연산 결과를 얻어낸다.
  for (const op of p) [numbers, ops] = execute(numbers, ops, op)
  // 최종 연산 결과를 얻어내고
  const [result] = numbers
  // 절대값을 리턴해서 담아낸다.
  return result > 0 ? result : result * -1
})
```

> 주어진 연산자(오퍼레이터)를 가지고 수식을 계산하는 함수

```js
const execute = (operands, operators, operator) => {
  const job = (operator, num1, num2) => {
    const operatorMapper = {
      '+': num1 + num2,
      '-': num1 - num2,
      '*': num1 * num2,
    }

    return operatorMapper[operator]
  }

  let foundOperatorIdx = operators.findIndex((op) => op === operator)
  while (foundOperatorIdx > -1) {
    const done = job(
      operators[foundOperatorIdx],
      operands[foundOperatorIdx],
      operands[foundOperatorIdx + 1]
    )

    // 인자로 들어오는 연산자들이 담겨있는 배열과, 피연산을 당하는 숫자를 줄여나간다.
    // splice 메소드로 직접 변형 함
    operators.splice(foundOperatorIdx, 1)
    operands.splice(foundOperatorIdx, 2, done)

    foundOperatorIdx = operators.findIndex((op) => op === operator)
  }

  return [operands, operators]
}
```

## Kakao 2018 추석 트래픽

- 문자열 => 수 => 날짜를 다루는 문제
- Date 객체를 사용해서 풀이 함
- 핵심은 밀리 세컨즈를 어떻게 핸들링 할 것인지 결정해야 하고
- 로그의 요청량이 변하는 구간이 어딘지를 알아내야 한다.

어차피 순회 해야하는 것은 로그의 시작과 끝점이다.
왜냐하면 요청량이 변하는 구간은 어차피 로그의 시작과 끝점이기 때문!

> 끝점과 걸린 시간을 통해 요청의 시작하는 시간과 끝나는 시간을 구하는 코드

```js
const responseIntervals = lines
  .map((l) => l.split(' '))
  .map(([date, end, time]) => [`${date}/${end}`, time])
  .map(([end, time]) => {
    const startDate = new Date(end)
    const parsedTime = time
      .replace('s', '')
      .split('.')
      .map((v, idx) => {
        if (idx === 1) return Number(v) * 10 ** Math.abs(v.length - 3)
        return Number(v)
      })

    const [seconds, millieSeconds] = parsedTime

    startDate.setMilliseconds(startDate.getMilliseconds() - millieSeconds + 1 || 1)
    startDate.setSeconds(startDate.getSeconds() - seconds)
    const endDate = new Date(end)
    return [startDate.getTime(), endDate.getTime()]
  })
```

> 시작과 끝나는 점에 대해서 1초의 마스크 안에 해당 요청이 들어가는지 확인하는 코드

```js
let max = -Infinity

const logPoints = responseIntervals.flatMap((v) => v)
logPoints.forEach((point) => {
  const [maskS, maskE] = [point, point + 999]
  const concurrent = responseIntervals.filter(([s, e]) => {
    if (s >= maskS && s <= maskE) return true // mask 가 구간의 왼쪽에 걸쳐 있을 때
    if (e >= maskS && e <= maskE) return true // mask 가 구간의 오른쪽에 걸쳐있을 때
    if (s <= maskS && e >= maskE) return true // mask 가 구간의 사이에 있을 때

    return false
  }).length

  max = Math.max(max, concurrent)
})
```
