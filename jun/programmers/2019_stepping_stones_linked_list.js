const log = console.log

class List {
  constructor() {
    this.head = null
    this.tail = null
    this.startingPoint = null
    this.graph = {}
  }

  setHead(node) {
    this.head = node
  }

  setTail(node) {
    this.tail = node
  }

  addNode(index, node) {
    this.graph[index] = node
  }

  getNode(index) {
    return this.graph[index]
  }

  setStartingPoint(startEmptyNode) {
    this.startingPoint = startEmptyNode
    this.startingPoint.next = this.head
    return this.startingPoint
  }

  findNext(node, maxStep) {
    let current = node
    const findUntil = (step) => {
      if (step > maxStep) return false
      let foundNode = current
      for (let i = 1; i <= step; i++) {
        foundNode = foundNode.next
      }

      if (foundNode === null) {
        current.capacity -= 1
        return 'crossed'
      }

      if (foundNode.capacity > 0) {
        current.capacity -= 1
        return foundNode
      } else {
        return findUntil(step + 1)
      }
    }

    return findUntil(1)
  }

  isValid(startingPoint, maxStep) {
    let found = this.findNext(startingPoint, maxStep)
    if (found === 'crossed') return 'directly crossed'
    if (!found) return false
    while (found) {
      found = this.findNext(found, maxStep)
      if (found === 'crossed') return true
      if (!found) return false
    }
  }
}

class Node {
  constructor(capacity) {
    this.capacity = capacity
    this.next = null
  }

  connect(node) {
    this.next = node
  }
}

const solution = (stones, maxStep) => {
  const stonesList = new List()
  for (let i = 0; i < stones.length; i++) {
    const stone = new Node(stones[i])

    if (i === 0) {
      stonesList.setHead(stone)
      stonesList.addNode(i, stone)
      continue
    }

    const prevStone = stonesList.getNode(i - 1)
    prevStone.connect(stone)
    stonesList.addNode(i, stone)

    if (i === stones.length - 1) {
      stonesList.setTail(stone)
    }
  }

  const startingPoint = stonesList.setStartingPoint(new Node('start'))
  let answer = 0

  while (true) {
    const result = stonesList.isValid(startingPoint, maxStep)
    if (result === 'directly crossed') {
      answer += 1
      break
    }

    if (result) {
      answer += 1
    }

    if (!result) break
  }

  return answer
}

log(solution([2, 4, 5, 3, 2, 1, 4, 2, 5, 1], 3))
log(solution([1, 1], 3))
// result: 3
