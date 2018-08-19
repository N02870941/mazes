class Queue {

  constructor() {

    this.queue  = [];
    this.length = 0;
  }

  push(value) {

    this.length++;

    this.queue.push(value);
  }

  pop() {

    if (this.length === 0) {

      return undefined;
    }

    this.length--;

    return this.queue.shift();
  }

  clear() {

    this.queue.length = 0;
    this.lenghth      = 0;
  }
}
