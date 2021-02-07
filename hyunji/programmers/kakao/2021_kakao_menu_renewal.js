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

const getBestCombination = (table) => {
  let maxcnt = 0, newCourses = [];
  for(let str in table){
    if(table[str] > maxcnt) maxcnt = table[str]; 
  }
  if(maxcnt < 2) return [];
  for(let str in table){
    if(table[str] === maxcnt) newCourses = [...newCourses, str];
  }
  return newCourses;
}

function solution(orders, course) {
  let answers = []
  for(let i = 0; i < course.length; i++){
    let table = {};
    for(let j = 0; j < orders.length; j++){
      if(orders[j].length < course[i]) continue;
      const newTable = getCombinations(orders[j].split('').sort().join(''), course[i], '', table);
      table = {...table, ...newTable};
    }
    answers = [...answers, ...getBestCombination(table)];
  }
  return answers.sort();
}