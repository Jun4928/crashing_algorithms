class Robot {
  constructor(r1, c1, r2, c2, d, isVertical){
    this.r1 = r1;
    this.c1 = c1;
    this.r2 = r2;
    this.c2 = c2;
    this.d = d;
    this.isVertical = isVertical;
  }
}

class Queue {
  constructor(){
    this.list = [];
  }

  enqueue(item){
    this.list.push(item);
  }

  front(){
    return this.list[0];
  }
  
  dequeue(){
    this.list.splice(0,1);
  }

  isEmpty(){
    return this.list.length === 0;
  }
}

const di = [-1,0,0,1];
const dj = [0,-1,1,0];


const getRotatedRobots = (prevrobot, board) => {
  const {r1, r2, c1, c2, d, isVertical} = prevrobot;
  const n = board.length;
  let robots = [];
  if(isVertical){
    if(c1 >= 1 && board[r1][c1-1] === 0 && board[r2][c1-1] === 0){
      const newrobot = new Robot(r1, c1-1, r1, c1, d+1, !isVertical);
      const newrobot2 = new Robot(r2,c1-1,c2,c1,d+1,!isVertical);
      robots.push(newrobot);
      robots.push(newrobot2);
    }
    if(c1 < n-1 && board[r1][c1+1] === 0 && board[r2][c1+1] === 0){
      const newrobot = new Robot(r1, c1, r1, c1+1, d+1, !isVertical);
      const newrobot2 = new Robot(r2, c2, r2, c2+1, d+1, !isVertical);
      robots.push(newrobot);
      robots.push(newrobot2);
    }
  }else {
    if(r1 >= 1 && board[r1-1][c1] === 0 && board[r1-1][c2] === 0){
      const newrobot = new Robot(r1-1,c1, r1, c1, d+1, !isVertical);
      const newrobot2 = new Robot(r1-1, c2, r1, c2, d+1, !isVertical);
      robots.push(newrobot);
      robots.push(newrobot2);
    }
    if(r1 < n-1 && board[r1+1][c1] === 0 && board[r1+1][c2] === 0){
      const newrobot = new Robot(r1, c1, r1+1,c1, d+1, !isVertical);
      const newrobot2 = new Robot(r2, c2, r2+1, c2, d+1, !isVertical);
      robots.push(newrobot);
      robots.push(newrobot2);
    }
  }
  return robots;
}

const bfs = (initrobot, board) => {
  let visited = [];
  visited[0] = Array.from(new Array(board.length), () => new Array(board.length).fill(0));
  visited[1] = Array.from(new Array(board.length), () => new Array(board.length).fill(0));
  visited[0][0][0] = 1;
  const q = new Queue();
  q.enqueue(initrobot);
  while(!q.isEmpty()){
    const front = q.front();
    q.dequeue();
    const {r1, r2, c1, c2, d, isVertical} = front;
    //이동하는 경우
    if(r1 === board.length - 1 && c1 === board.length - 1) return d;
    if(r2 === board.length - 1 && c2 === board.length - 1) return d;

    for(let i = 0; i < 4; i++){
      const nr1 = r1 + di[i];
      const nr2 = r2 + di[i];
      const nc1 = c1 + dj[i];
      const nc2 = c2 + dj[i];
      const vidx = isVertical ? 1 : 0;
      if(nr1 < 0 || nr1 >= board.length || nr2 < 0 || nr2 >= board.length || nc1 < 0 || nc1 >= board.length || nc2 < 0 || nc2 >= board.length) continue;
      if(visited[vidx][nr1][nc1] === 0 && board[nr1][nc1] === 0 && board[nr2][nc2] === 0){
        const next = new Robot(nr1, nc1, nr2, nc2, d+1, isVertical);
        visited[vidx][nr1][nc1] = 1;
        q.enqueue(next);
      }
    }
    //회전하는 경우
    const rotated = getRotatedRobots(front, board);
    for(let i = 0; i < rotated.length; i++){
      const {r1: nr1, r2: nr2, c1: nc1, c2: nc2, d: nd, isVertical: nisVertical} = rotated[i];
      const vidx = nisVertical ? 1 : 0;
      if(visited[vidx][nr1][nc1] === 0){
        visited[vidx][nr1][nc1] = 1;
        q.enqueue(rotated[i]);
      }
    }
  }
}

function solution(board) {
  const robot = new Robot(0,0,0,1,0,false);
  // const result = bfs(robot, board);
  const result = bfs(robot, board);
  return result;
}