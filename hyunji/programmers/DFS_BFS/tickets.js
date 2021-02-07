
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