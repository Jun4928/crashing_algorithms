const langs = ['python', 'cpp', 'java'];
const positions = ['frontend', 'backend'];
const levels = ['junior', 'senior'];
const prefers = ['chicken', 'pizza'];

const sortArrs = (obj) => {
  for(let lang of langs){
    for(let position of positions){
      for(let level of levels){
        for(let prefer of prefers){
          obj[lang][position][level][prefer].sort((num1, num2) => num1 - num2);
        }
      }
    }
  }
  return obj;
}

const splitQuery = (query) => {
  const splitted = query.split(' ');
  return [splitted[0], splitted[2], splitted[4], splitted[6], splitted[7]];
}

const binarySearch = (arr, score) => {
  let s = 0;
  let e = arr.length;
  let mid;
  let answeridx = null;
  while(s <= e){
    mid = Math.floor((s + e) / 2);
    if(arr[mid] >= score) {
      answeridx = mid;
      e = mid - 1;
    } else s = mid + 1;
  }
  return answeridx;
}

const counting = (arr, obj, idx, score) => {
  if(idx >= 4){
    if(obj[obj.length-1] < score) return 0;
    const minidx = binarySearch(obj, score);
    return obj.length - minidx;
  }
  let count = 0;
  for(let i = 0; i < arr[idx].length; i++){
    const key = arr[idx][i];
    count += counting(arr, obj[key], idx+1, score);
  }
  return count;
}

const getCount = (query, recruitee) => {
  const [lang, position, level, prefer, score] = splitQuery(query);
  let arrs = [];
  arrs = lang === '-' ? [...arrs, [...langs]] : [...arrs, [lang]];
  arrs = position === '-' ? [...arrs, [...positions]] : [...arrs, [position]];
  arrs = level === '-' ? [...arrs, [...levels]] : [...arrs, [level]];
  arrs = prefer === '-' ? [...arrs, [...prefers]] : [...arrs, [prefer]];
  
  return counting(arrs,recruitee, 0, +score);
}

function solution(info, query) {
  const initial = {
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

  for(let i = 0; i < info.length; i++){
    const [language, position, level, prefer, score] = info[i].split(' ');
    initial[language][position][level][prefer].push(+score);
  }
  const recruitee = sortArrs(initial);
  const answers = query.map((q) => getCount(q, recruitee));
  return answers;
}