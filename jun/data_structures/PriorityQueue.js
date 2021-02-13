const Heap = require('./Heap')

/**
 * @fileoverview Data Structure: Priority Queue
 *
 * min heap 을 상속해서 구현한 우선순위 큐
 * min heap 의 insert 메소드가 enqueue 가 되고
 * min heap 의 remove 메소드가 dequeue 가 된다.
 */
module.exports = class PriorityQueue extends Heap {
  constructor() {
    super()
  }

  enqueue = (priority, value) => this.insert(priority, value)
  dequeue = () => this.remove()
  isEmpty = () => this.heap.length <= 0
}
