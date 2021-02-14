const init = (n, road) => {
  let dist = Array.from(new Array(n), () => new Array(n).fill(Infinity));
  for (let i = 0; i < n; i++) dist[i][i] = 0;
  for (let i = 0; i < road.length; i++) {
    const [a, b, c] = road[i];
    if (dist[a - 1][b - 1] > c) {
      dist[a - 1][b - 1] = c;
      dist[b - 1][a - 1] = c;
    }
  }
  return dist;
};

function solution(N, road, K) {
  let dist = init(N, road);

  for (let k = 0; k < N; k++) {
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        dist[i][j] = Math.min(dist[i][j], dist[i][k] + dist[k][j]);
      }
    }
  }

  let cnt = 0;
  for (let i = 0; i < N; i++) {
    if (dist[0][i] <= K) cnt++;
  }
  return cnt;
}
