function solution(n, results) {
  let graph = Array.from(new Array(n), () => new Array(n).fill(Infinity));
  let answer = 0;

  for (let i = 0; i < results.length; i++) {
    const [a, b] = results[i];
    graph[a - 1][b - 1] = 1;
  }
  for (let i = 0; i < n; i++) graph[i][i] = 0;

  //floyd wharshall
  for (let k = 0; k < n; k++) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        graph[i][j] = graph[i][j] < graph[i][k] + graph[k][j] ? graph[i][j] : graph[i][k] + graph[k][j];
      }
    }
  }

  for (let number = 0; number < n; number++) {
    let check = new Array(n).fill(0);
    for (let i = 0; i < n; i++) {
      if (i !== number && graph[number][i] < Infinity) check[i] = 1;
      if (i !== number && graph[i][number] < Infinity) check[i] = 1;
    }
    const cnt = check.reduce((acc, val) => acc + val, 0);
    if (cnt === n - 1) answer++;
  }
  return answer;
}
