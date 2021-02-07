
const filterString = (new_id) => {
  let newString = '';
  for(let i = 0; i < new_id.length; i++){
    if( (new_id.charCodeAt(i) >= 'a'.charCodeAt(0) && new_id.charCodeAt(i) <= 'z'.charCodeAt(0)) || (Number(new_id[i]) >= 0 && Number(new_id[i]) <= 9) || new_id[i] === '-' || new_id[i] === '_' || new_id[i] === '.'){
      newString += new_id[i];
    } 
  }
  return newString;
}

const convertDots = (new_id) => {
  if(!new_id) return '';
  let newString = new_id[0];
  for(let i = 1; i < new_id.length; i++){
    if(new_id[i] === '.' && newString[newString.length-1] === '.') continue;
    newString += new_id[i];
  }
  if(newString[0] === '.') newString = newString.substring(1,newString.length);
  if(newString[newString.length-1] === '.') newString = newString.substring(0,newString.length-1);
  return newString;
}

const sliceOrAppend = (new_id) => {
  if(!new_id) return 'a';
  if(new_id.length >= 16) {
    const newstr = new_id.substring(0,15);
    return newstr[newstr.length-1] === '.' ? newstr.substring(0,newstr.length-1) : newstr;
  }
  return new_id;
}

const getStretchedString = (new_id) => {
  if(new_id.length >= 3) return new_id;
  let newstr = new_id;
  while(newstr.length <= 2){
    newstr += new_id[new_id.length-1];
  }
  return newstr;
}


function solution(new_id) {
  new_id = new_id.toLowerCase();
  const filtered = filterString(new_id);
  const converted = convertDots(filtered);
  const sliced = sliceOrAppend(converted);
  return getStretchedString(sliced);
}

