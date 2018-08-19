class Stack {

  constructor() {

    this.stack  = [];
    this.length = 0;
  }

  push(value) {

    this.length++;

    this.stack.push(value);
  }

  pop() {

    if (this.length === 0) {

      return undefined;
    }

    this.length--;

    return this.stack.pop();
  }

  clear() {

    this.stack.length = 0;
    this.lenghth      = 0;
  }
}
