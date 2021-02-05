

const popBlocks = (row, col, board) => {
  let topop = Array.from(new Array(row), () => new Array(col).fill(0));
  for(let i = 0; i <= row-2; i++){
    for(let j = 0; j <= col-2; j++){
      let count = 0;
      let character = board[i][j];
      if(character === '0') continue;
      for(let r = i; r < i + 2; r++){
        for(let c = j; c < j + 2; c++){
          if(board[r][c] === character) count++;
        }
      }
      if(count === 4){
        for(let r = i; r < i+2; r++){
          for(let c = j; c < j+2; c++){
            topop[r][c] = 1;
          }
        }
      }
    }
  }
  let count = 0;
  for(let i = 0; i < row; i++){
    for(let j = 0; j < col; j++){
      if(topop[i][j] === 1) count++;
    }
  }
  return {count, topop};
}

const blockFalls = (topop, board, row, col) => {
  let newBoard = Array.from(new Array(row), () => new Array(col).fill('0'));
  for(let c = 0; c < col; c++){
    let newcols = [];
    for(let r = 0; r < row; r++){
      if(board[r][c] !== '0' && topop[r][c] === 0) newcols.push(board[r][c]);
    }
    for(let i = newcols.length - 1; i >= 0; i--){
      newBoard[row - newcols.length + i][c] = newcols[i];
    }
  }
  return newBoard;
}

function solution(m, n, board) {
  let answer = 0;
  while(true){
    const {count, topop} = popBlocks(m,n,board);
    if(!count) break;
    answer += count;
    board = blockFalls(topop, board, m, n);
  }
  return answer;
}