# Binary Search 알고리즘

## 입국 심사

- Parametric Search

### 시행착오

- 문제를 맞딱드리고, 입국심사를 기다리는 사람의 최대 수가 억대에 달하기 때문에 사람을 기준으로 로직을 구현하면 효율성에 문제가 있을 것이라고 파악함
- 거꾸로 뒤집어서 걸리는 시간의 최소값을 구하기 위해서 **결정 문제** 로 접근했고, 조건을 만족하는 최소값을 구하는 Parametric Search 알고리즘을 적용해야 한다고 생각했다.
- 하지만, 초기 최소, 최대값을 구하는 로직과 탐색 중인 해당 시간이 조건을 만족하는지를 구현하는 로직에서 애를 먹었다.

> Parametric Search 의 인자로 넘겨줄 최대, 최소값

```js
// 최대로 오래 걸리는 사람의 시간에 동시에 진행될 수 있는 싸이클(사람수 / 입국심사관 수)을 곱한다.
const max = Math.ceil(people / times.length) * Math.max(...times)

// 입국 심사관중에 가장 짧은 시간이 걸리는 사람을 최소값으로 한다.
const min = Math.min(...times)
```

> 해당 시간에 몇명의 사람이 심사를 받을 수 있는지 확인하는 로직

```js
const isPossible = (people, times, minutes) => {
  // 해당 시간을 각 입국 심사관이 걸리는 시간으로 나누고, 합치게 되면
  // 해당 시간에 수용할 수 잇는 사람의 수(capacity)가 된다.
  const capacity = times.map((time) => Math.floor(minutes / time)).reduce((a, b) => a + b, 0)

  // 해당 시간에 수용할 수 있는 사람의 수보다 심사를 기다리는 사람의 수가 작거나 같을 때, true 를 반환한다.
  return people <= capacity
}
```

> Parametric Search

```js
const binarySearchWithCondition = (people, times, min, max) => {
  if (min === max) return max

  while (min <= max) {
    const mid = Math.floor((max + min) / 2)
    // 해당 시간에 기다리는 사람을 수용할 수 있으면 그 아래 시간을 검사한다.
    if (isPossible(people, times, mid)) max = mid - 1
    // 해당 시간에 기다리는 사람을 수용할 수 없으면 그 위의 시간을 검사한다.
    else min = mid + 1
  }

  return max + 1
}
```
