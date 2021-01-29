# Programmers

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
