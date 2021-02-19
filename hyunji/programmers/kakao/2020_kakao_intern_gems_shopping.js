const isValid = (length, gems, jewels, objectives) => {
  let cnt = 0;
  for (let i = 0; i < length; i++) {
    const gem = gems[i];
    if (!jewels[gem]) cnt++;
    jewels[gem]++;
  }
  if (cnt === objectives) return [1, length];
  for (let i = length; i < gems.length; i++) {
    const toDelete = gems[i - length];
    const toAdd = gems[i];
    jewels[toDelete]--;
    if (!jewels[toDelete]) cnt--;
    if (!jewels[toAdd]) cnt++;
    jewels[toAdd]++;
    if (cnt === objectives) return [i - length + 2, i + 1];
  }
  return false;
};

function solution(gems) {
  const jewels = {};
  for (let i = 0; i < gems.length; i++) {
    const gem = gems[i];
    if (!jewels[gem]) jewels[gem] = 0;
  }
  const jewelCount = Object.keys(jewels).length;
  if (jewelCount === gems.length) return [1, gems.length];
  if (jewelCount === 1) return [1, 1];

  let s = jewelCount - 1;
  let e = gems.length;
  let mid, answer;
  while (s <= e) {
    mid = Math.floor((s + e) / 2);
    const indexes = isValid(mid, gems, { ...jewels }, jewelCount);
    if (indexes) {
      answer = indexes;
      e = mid - 1;
    } else s = mid + 1;
  }
  return answer;
}
