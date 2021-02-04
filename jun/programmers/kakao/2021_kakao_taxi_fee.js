const log = console.log

// class Graph {
//   constructor() {
//     this.graph = {}
//   }

//   addNode(point) {
//     const hasPoint = this.graph[point.id]
//     if (hasPoint) return

//     this.graph[point.id] = point
//   }

//   getNode(pointId) {
//     return this.graph[pointId]
//   }
// }

// class Point {
//   constructor(id) {
//     this.id = id
//     this.roads = []
//   }

//   connect(point, fare) {
//     this.roads.push({ point, fare })
//   }
// }

// const solution = (n, s, a, b, fares) => {
//   const map = new Graph()

//   fares.forEach(([pointId1, pointId2, fare]) => {
//     const point1 = map.getNode(pointId1) || new Point(pointId1)
//     const point2 = map.getNode(pointId2) || new Point(pointId2)

//     point1.connect(point2, fare)
//     point2.connect(point1, fare)

//     map.addNode(point1)
//     map.addNode(point2)
//   })

//   // for (const pointId in map.graph) {
//   //   const { id, roads } = map.getNode(pointId)
//   //   log('point', id)
//   //   log('roads', roads)
//   // }
//   const { id, roads } = map.getNode(s)
//   log(id, roads)
// }

const solution = (n, s, a, b, fares) => {
  const graph = [...new Array(n)].map((_, row) =>
    [...new Array(n)].map((__, column) => (row === column ? 0 : Infinity))
  )

  fares.forEach(([point1, point2, fare]) => {
    graph[point1 - 1][point2 - 1] = fare
    graph[point2 - 1][point1 - 1] = fare
  })

  for (let mid = 0; mid < n; mid++) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        graph[i][j] = Math.min(graph[i][j], graph[i][mid] + graph[mid][j])
      }
    }
  }

  let min = Infinity
  for (let k = 0; k < n; k++) {
    min = Math.min(min, graph[s - 1][k] + graph[k][a - 1] + graph[k][b - 1])
  }

  return min
}

log(
  solution(6, 4, 6, 2, [
    [4, 1, 10],
    [3, 5, 24],
    [5, 6, 2],
    [3, 1, 41],
    [5, 1, 24],
    [4, 6, 50],
    [2, 4, 66],
    [2, 3, 22],
    [1, 6, 25],
  ])
) // 82

log(
  solution(7, 3, 4, 1, [
    [5, 7, 9],
    [4, 6, 4],
    [3, 6, 1],
    [3, 2, 3],
    [2, 1, 6],
  ])
) // 14

log(
  solution(6, 4, 5, 6, [
    [2, 6, 6],
    [6, 3, 7],
    [4, 6, 7],
    [6, 5, 11],
    [2, 5, 12],
    [5, 3, 20],
    [2, 4, 8],
    [4, 3, 9],
  ])
) // 18
