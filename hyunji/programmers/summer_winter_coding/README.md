## 배달

카카오 2021 블라인드 문제 중 합승 택시 요금처럼 floyd wharshall 알고리즘을 이용해서 풀 수 있는 문제였습니다~~

두번이나 풀어버렸으니 이젠 까먹지 않을 수 있을 것 같은 자신감이 생겻읍니다

```js
  for (let k = 0; k < N; k++) {
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        dist[i][j] = Math.min(dist[i][j], dist[i][k] + dist[k][j]);
      }
    }
  }
```

