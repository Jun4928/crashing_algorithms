function solution(gems) {
  let answer = [1, gems.length];
  let minLength = gems.length;
  const jewels = {};
  for (let i = 0; i < gems.length; i++) {
    const gem = gems[i];
    if (!jewels[gem]) jewels[gem] = 0;
  }
  const objective = Object.keys(jewels).length;
  let s = 0,
    e = 0,
    cnt = 1;
  jewels[gems[0]] = 1;
  while (true) {
    if (e >= gems.length) break;
    if (cnt >= objective) {
      if (e - s + 1 < minLength) {
        minLength = e - s + 1;
        answer = [s + 1, e + 1];
      }
      const sgem = gems[s];
      jewels[sgem]--;
      if (!jewels[sgem]) cnt--;
      s++;
    } else {
      e++;
      const egem = gems[e];
      if (!jewels[egem]) cnt++;
      jewels[egem]++;
    }
  }
  return answer;
}
