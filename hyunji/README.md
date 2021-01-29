## Programmers

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





