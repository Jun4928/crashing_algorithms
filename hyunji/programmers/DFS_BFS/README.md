### 단어 변환

dfs로 풀었습니다! 왜냐면 전 dfs가 더 편하거든요...!!!

주어진 단어들의 목록에 대해서 재귀적으로 탐색을 하면서 target 문자열이 되는 순간

최소 depth에 대해서 비교를 해줍니다. 

++ target 문자열이 아닌데 최소값보다 depth가 크거나 같다면 탐색을 종료하도록 하여 불필요한 탐색을 하지 않도록 했습니다!

```js
let answer = 8979698;

const dfs = (visited, words, depth, target, current) => {
  if(current === target){
    if(depth < answer) {
      answer = depth;
      return;
    }
  }
  if(depth >= answer) return;
  for(let i = 0; i < words.length; i++){
    if(visited[i] === 0 && isConvertable(current, words[i])){
      visited[i] = 1;
      dfs(visited, words, depth+1, target, words[i]);
      visited[i] = 0;
    }
  }
}
```

------



### 여행 경로

마찬가지로 dfs로 풀었습니다! 

```js

const dfs = (cnt, cur, road, visited, tickets) => {
  if(cnt === 0){
    return road;
  }
  let answer;
  for(let i = 0; i < tickets.length; i++){
    if(answer) break;
    const [dep, arr] = tickets[i];
    if(visited[i] === 0 && dep === cur){
      visited[i] = 1;
      answer = dfs(cnt - 1, arr, [...road, arr], visited, tickets);
      visited[i] = 0;
    }
  }
  return answer;
}

function solution(tickets) {
  const answer = dfs(tickets.length, "ICN", ["ICN"], new Array(tickets.length).fill(0), tickets.sort());
  return answer;
}
```

가지고 있는 티켓들에 대해서 재귀적으로 탐색을 하며 모든 티켓을 다 소모하는 순간 answer에 할당하게 됩니다.

문제의 조건 중 경로가 여러 개인 경우, 사전 순으로 더 앞 순서인 경로를 답으로 해야 한다는 문항 때문에 tickets 배열을 한번 sort 해주었습니다!