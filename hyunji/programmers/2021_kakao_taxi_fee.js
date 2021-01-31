
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

function solution(n, s, a, b, fares) {
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
  
  let mindist = 989898988;

  for(let i = 0; i < n; i++){
    if(mindist > distance[s-1][i] + distance[i][a-1] + distance[i][b-1]) mindist = distance[s-1][i] + distance[i][a-1] + distance[i][b-1];
  }

  return mindist;
}