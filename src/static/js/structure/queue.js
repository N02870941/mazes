/**
 * FIFO structure.
 */
class Queue {

  /**
   * Constructs empty queue.
   */
  constructor() {

    this.queue  = [];
    this.length = 0;
  }

  /**
   * Enqueue a value.
   */
  push(value) {

    this.length++;

    this.queue.push(value);
  }

  /**
   * Dequeue a value.
   */
  pop() {

    if (this.length === 0) {

      return undefined;
    }

    this.length--;

    return this.queue.shift();
  }

  /**
   * Empties the queue.
   */
  clear() {

    this.queue.length = 0;
    this.lenghth      = 0;
  }
}
