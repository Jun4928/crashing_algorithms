const PriorityQueue = require('./PriorityQueue')

const pq = new PriorityQueue()

pq.enqueue(3, 1)
pq.enqueue(2, 2)
pq.enqueue(10, 100)
pq.enqueue(1, 9)
pq.enqueue(1, 9)
pq.enqueue(5, 9)
pq.enqueue(10, 13)

console.log(pq.remove())
console.log(pq.remove())
console.log(pq.remove())
console.log(pq.remove())
console.log(pq.remove())
console.log(pq.remove())
console.log(pq.remove())
console.log(pq.remove())
console.log(pq.remove())

console.log(pq.isEmpty())
pq.enqueue(3, 'aasdf')
console.log(pq.isEmpty())
pq.enqueue(2, 'aasdf')
console.log(pq.remove())
pq.enqueue(2, '1')
pq.enqueue(2, '2')
pq.enqueue(2, '3')
pq.enqueue(4, '3')
pq.enqueue(1, '3')

console.log(pq)
console.log(pq.dequeue())
console.log(pq)
console.log(pq.dequeue())
console.log(pq)
console.log(pq.dequeue())
console.log(pq)
console.log(pq.dequeue())
console.log(pq)
console.log(pq.dequeue())
console.log(pq)
console.log(pq.dequeue())
console.log(pq)
console.log(pq.dequeue())
console.log(pq)