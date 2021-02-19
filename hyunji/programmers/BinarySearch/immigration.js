function solution(n, times) {
  let s = 0,
    answer;
  let e =
    times.reduce((acc, val) => {
      return val > acc ? val : acc;
    }, 0) * n;
  let mid;
  while (s <= e) {
    mid = Math.floor((s + e) / 2);
    let count = 0;
    for (let time of times) {
      count += Math.floor(mid / time);
    }
    if (count >= n) {
      answer = mid;
      e = mid - 1;
    } else s = mid + 1;
  }
  return answer;
}
