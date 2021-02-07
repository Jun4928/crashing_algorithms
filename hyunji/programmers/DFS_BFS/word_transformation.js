const INIT_VALUE = 987967896;
let answer = INIT_VALUE;;

const isConvertable = (prev, next) => {
  let cnt = 0;
  for(let i = 0; i < prev.length; i++){
    if(prev[i] !== next[i]) cnt++;
  }
  return cnt === 1 ? true : false;
}

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

function solution(begin, target, words) {
  if(!words.includes(target)) return 0;
  dfs(new Array(words.length).fill(0), words, 0, target, begin);
  if(answer === INIT_VALUE) return 0;
  return answer;
}