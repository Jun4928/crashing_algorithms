

const isPossible = (friends, stones, k) => {
  let count = 0;
  for(let i = 0; i < k; i++){
    if(stones[i] < friends) count++;
  }
  if( count >= k ) return false; 
  for(let i = k; i < stones.length; i++){
    if(stones[i-k] < friends) count--;
    if(stones[i] < friends) count++;
    if(count >= k) return false;
  }
  return true;
}

function solution(stones, k) {
  let answer = 0;
  let s = 0, e = 0, mid; // 왜 e = Math.max(...stones)를 쓰면 안되는 걸까..?
  for(let i = 0; i < stones.length; i++){
    if(e < stones[i]) e = stones[i];
  }
  while(s <= e){
    mid = Math.floor( (s + e) / 2 );
    if(isPossible(mid, stones, k)){
      s = mid + 1;
      answer = answer < mid ? mid : answer;
    } else e = mid - 1;
  }
  return answer;
}