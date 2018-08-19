/**
 * Heap data structure.
 */
class Heap {

  /**
   * Constructs an empty heap.
   */
  constructor() {

    this.heap   = [];
    this.length = 0;
  }

//------------------------------------------------------------------------------

  /**
   * Increases size of
   * internal array.
   */
  grow() {

    // Create array double the size
    let length = (2 * this.heap.length) || 16;
    let array  = new Array(length);

    let i = 0;

    // Copy into new array
    while (i < this.heap.length) {

      array[i] = this.heap[i];

      i++;
    }

    this.heap = array;
  }

//------------------------------------------------------------------------------

  /**
   * Extract min value from heap.
   */
  pop() {

    return this.remove(0);
  }

//------------------------------------------------------------------------------

  /**
   * Removes value by index.
   */
  remove(i) {

    // Stack is empty
    if (this.length === 0) {

      throw new Error('Cannot remove() from empty heap');
    }

    // Verify index
    if (i < 0 || i >= this.length) {

      throw new Error(`Invalid index: ${i}`);
    }

    // Get value
    let value = this.heap[i];

    // Bring last value up
    this.heap[i] = this.heap[this.length-1];

    // Erase old value
    this.heap[this.length] = null;

    // Bubble down
    this.down(i);

    this.length--;

    return value;
  }

//------------------------------------------------------------------------------

  /**
   * Inserts a value.
   */
  push(value) {

    // Make space if full
    if (this.full()) {

      this.grow();
    }

    // Place at bottom of heap
    this.heap[this.length] = value;

    // Bubble up
    this.up(this.length);

    // Increase size by one
    this.length++;
  }

//------------------------------------------------------------------------------

  /**
   * Swaps to values
   * in internal array.
   */
  swap(i, j) {

    let t = heap[i];

    heap[j] = heap[i];
    heap[i] = t;
  }

//------------------------------------------------------------------------------

  /**
   * Bubble up.
   */
  up(i) {

    let parent;
    let child;
    let p;
    let c;

    child  = i;
    parent = this.parent(child);

    // Go up to button
    // not including root
    while (child > 0) {

      // Get the cost
      p = this.heap[parent].cost;
      c = this.heap[child].cost;

      // If child is
      // less than parent, swap
      if (c < p) {

          this.swap(child, parent);
      }

      // Swap references
      // for next iteration
      child  = parent;
      parent = this.parent(child);
    }

  }

//------------------------------------------------------------------------------

  /**
   * Bubble down.
   */
  down(i) {

    // Indices
    let left;
    let right;
    let parent;
    let max;

    // Costs
    let l;
    let r;
    let m;

    // Start at i
    parent = i;

    // Loop until break
    while (true) {

      // Get left and right children
      left  = this.left(parent);
      right = this.right(parent);
      max   = parent;

      // Cost of parent
      m = this.heap[max].cost;

      // Left child is smaller
      if (left < this.length && this.heap[left].cost < m) {

        max = left;
      }

      // Right child is even smaller
      if (right < this.length && this.heap[right].cost < m) {

        max = right;
      }

      // Reference was changed
      // Swap values, and keep
      // reference to parent
      if (parent != max) {

        this.swap(parent, max);

        parent = max;

      // No swap occured, so
      // heap property has been restored
      } else {

        break;
      }
    }

  }

//------------------------------------------------------------------------------

  /**
   * Resets the heap.
   */
  clear() {

    this.heap.length = 0;
    this.length      = 0;
  }

//------------------------------------------------------------------------------

  /**
   * Parent index.
   */
  parent(child) {

    let parent = (child - 1) / 2;

    return Math.floor(parent);
  }

//------------------------------------------------------------------------------

  /**
   * Left child index.
   */
  left(parent) {

    return (2 * parent) + 1;
  }

//------------------------------------------------------------------------------

  /**
   * Right child index.
   */
  right(parent) {

    return (2 * parent) + 2
  }

//------------------------------------------------------------------------------

  /**
   * Determines if internal
   * array is full.
   */
  full() {

    return this.heap.length === length;
  }

}
