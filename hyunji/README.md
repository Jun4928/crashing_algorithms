## ㅇProgrammers

### 2021 블라인드 - 신규 아이디 추천

정말 말그대로 문제에 주어진 과정대로 문자열을 다루면 됐던 문제!

regex를 썼으면 정말 멋졌겠지만... 아직 그것에 익숙하지 않아서  문자를 ascii 코드로 변환해서 걸러냄

```js
new_id.charCodeAt(i) >= 'a'.charCodeAt(0) && new_id.charCodeAt(i) <= 'z'
```

charCodeAt() 메소드를 통해서 ascii 코드를 알아낼수있었음!

### 2021 블라인드 - 메뉴 리뉴얼

orders에 있는 메뉴들이 알파벳순이 아니라서 한번 sort를 해주고 나서 코스요리 메뉴 수만큼의 조합을 뽑아야함. 재귀로! 

```js
const getCombinations = (str, len, newstr, table) => {
  if(newstr.length === len) {
    if(!table[newstr]) table[newstr] = 1;
    else table[newstr]++;
    return table;
  }
  for(let i = 0; i < str.length; i++){
    getCombinations(str.substring(i+1), len, newstr + str[i], table);
  }
  return table;
}
```

key코스요리 구성 : value 선택된 수 쌍으로 이루어진 객체를 만들고 이 테이블을 보면서

가장 많이 선택된 메뉴를 고르도록 함!



### 2021 블라인드 - 순위 검색

일단 객체를 만들어야 함. 

```js
const obj = {
    cpp : { 
      frontend: { junior: { chicken : [], pizza : [] }, senior: { chicken : [], pizza : [] } },
      backend: { junior: { chicken : [], pizza : [] }, senior: { chicken : [], pizza : [] } },
    },
    java : { 
      frontend: { junior: { chicken : [], pizza : [] }, senior: { chicken : [], pizza : [] } },
      backend: { junior: { chicken : [], pizza : [] }, senior: { chicken : [], pizza : [] } },
    },
    python : { 
      frontend: { junior: { chicken : [], pizza : [] }, senior: { chicken : [], pizza : [] } },
      backend: { junior: { chicken : [], pizza : [] }, senior: { chicken : [], pizza : [] } },
    }
  }
```

대충 이런 모양의... 

뭔가 재귀로 만드려고 했는데 자꾸 얕은복사가 돼서 일단 하드코딩함...굉장히 맘에 안드는 코드....ㅡㅡ

그리고 query를 읽으면서 각 배열에 점수를 추가해주고 각 경우마다 점수 오름차순으로 정렬해줌!

후에 binary search를 이용해서 해당 점수 이상의 시험자가 몇명인지 체크할 수 있도록 했습니다!



### 2021 블라인드 - 합승 택시 요금

Floyd Wharshall 알고리즘을 이용했습니다. 

그래프에서 최단거리를 구할때 쓰는 알고리즘인데 모든 정점에서 다른 모든 정점에까지의 최단거리를 구할 때 사용한다고 하네요! 

[나동빈님 블로그]: https://blog.naver.com/ndb796/221234427842

알고리즘에 대한 자세한 설명과 구현 방법은 저의 알고리즘 선생님 [나동빈님 블로그]를 참고해주세용...ㅎㅎ...

```js
const initDistance = (n, fares) => {
  const distance = Array.from(new Array(n), () => new Array(n).fill(9900000));
  for(let i = 0; i < fares.length; i++){
    const [a, b, fee] = fares[i];
    distance[a-1][b-1] = fee;
    distance[b-1][a-1] = fee;
  }
  for(let i = 0; i < n; i++){
    distance[i][i] = 0;
  }
  return distance;
}


...

  const distance = initDistance(n, fares);
  for(let i = 0; i < n; i++){
    for(let j = 0; j < n; j++){
      for(let k = 0; k < n; k++){
        if(distance[j][k] > distance[i][j] + distance[i][k]){
          distance[j][k] = distance[i][j] + distance[i][k];
          distance[k][j] = distance[i][j] + distance[i][k];
        }
      }
    }
  }
```

 먼저 distance 배열을 초기화해주고 모든 정점에 대한 최소거리를 구해줍니다.

그 후 모든 정점에 대해서 `min( distance[s][들르는곳] + distance[들르는곳][a] + distance[들르는곳][b] )` 해주면 끝~~



### 2019 겨울 인턴십 - 징검다리 건너기

parametric search를 이용해야 하는 문제였습니다.

바이너리 서치로 구해야 하는 값은 건널 수 있는 니니즈 친구들의 수이고, `O(log n)`

건널 수 있는지 없는지는 stones 배열을 순환하면서 `O(n)`

연속된 k개의 값이 해당 니니즈 친구들의 수보다 작은지 체크하도록 했습니다.

따라서 `O(nlogn)` 으로 효율성 체크를 패스할 수 있게 되었읍니다!!

그런데 바이너리 서치 할 때 초기값을 잡아주는 부분에서 끝 값을 `Math.max(...stones)` 

를 쓰면 런타임 에러가 나더라구요... 왜일까요...🤔 for문으로 한번 순환하면서 최댓값을 찾도록 했더니 바로 통과했습니다!

```js
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
```

Stones 배열을 순환하면서 k개의 friends보다 작은 연속된 값이 있는지 체크하는 함수!

