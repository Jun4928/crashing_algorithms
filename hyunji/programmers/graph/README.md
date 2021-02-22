## 순위

이걸 어떻게 풀어야하나 고민을 좀 많이 했던 문제... 

아무튼간에 a가 b를 이겼다는 정보를 그래프에 담고 

만약 1번 선수를 보자고 했을 때 1번을 이긴 선수의 수와 1번이 이긴 선수의 수의 합이 `n-1` 명이면 순위를 정할 수 있다는 점에서

floyd wharshall 을 사용해서 각 선수 사이가 연결이 돼있는지 아닌지를 체크해서 n-1이면 answer++를 해주었습니다~

```js
  for (let number = 0; number < n; number++) {
    let check = new Array(n).fill(0);
    for (let i = 0; i < n; i++) {
      if (i !== number && graph[number][i] < Infinity) check[i] = 1;
      if (i !== number && graph[i][number] < Infinity) check[i] = 1;
    }
    const cnt = check.reduce((acc, val) => acc + val, 0);
    if (cnt === n - 1) answer++;
  }
```

