/**
 * FILO structure.
 */
class Stack {

  /**
   * Constructs an empty stack.
   */
  constructor() {

    this.stack  = [];
    this.length = 0;
  }

  /**
   * Push a value.
   */
  push(value) {

    this.length++;

    this.stack.push(value);
  }

  /**
   * Pop a value.
   */
  pop() {

    if (this.length === 0) {

      return undefined;
    }

    this.length--;

    return this.stack.pop();
  }

  /**
   * Empties the stack.
   */
  clear() {

    this.stack.length = 0;
    this.lenghth      = 0;
  }
}
