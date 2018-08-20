// https://stackoverflow.com/questions/42919469/efficient-way-to-implement-priority-queue-in-javascript

// const top = 0;
const left   = i => (i << 1) + 1;
const right  = i => (i + 1) << 1;
const parent = i => ((i + 1) >>> 1) - 1;

//------------------------------------------------------------------------------

/**
 * Heap specifically
 * for Cell objects.
 */
class Heap {

  /**
   * Constructs empty heap.
   */
  constructor(comparator) {

    // Default min heap for numbers
    let c = (a, b) => a < b;

    this._map        = new Map();
    this._heap       = [];
    this._comparator = comparator || c;
  }

//------------------------------------------------------------------------------

  /**
   * Determines if heap
   * contains a specific cell.
   */
  has(cell) {

    return this._map.has(cell.key);
  }

//------------------------------------------------------------------------------

  /**
   * Size of heap.
   */
  size() {

    return this._heap.length;
  }

//------------------------------------------------------------------------------

  /**
   * Determines if
   * heap is empty.
   */
  empty() {

    return this.size() == 0;
  }

//------------------------------------------------------------------------------

  /**
   * Returns min value of heap.
   */
  peek() {

    return this._heap[0];
  }

//------------------------------------------------------------------------------

  /**
   * Adds new value to heap.
   */
  push(value) {

    // Add to internal array
    this._heap.push(value);

    // Store it's index
    this._map.set(value.key, this._heap.length-1);

    // Bubble up
    this._siftUp();

    return this.size();
  }

//------------------------------------------------------------------------------

  /**
   * Extract min from heap.
   */
  pop() {

    return this._delete(0);
  }

//------------------------------------------------------------------------------

  /**
   * Replaces min value of heap.
   */
  replace(element) {

    // Get top value
    const old = this.peek();

    // Put new value at top
    this._heap[0] = element;

    // Bubble down
    this._siftDown();

    return old;
  }

//------------------------------------------------------------------------------

  /**
   * Decreases a cells priority
   * with a new specified cost.
   */
  decrease(cell, cost) {

    // Get index
    let i = this._map.get(cell.key);

    // Update it's cost
    cell.cost = cost;

    // Cell is present
    if (i || i === 0 ) {

      // Delete it's reference
      this._delete(i);
    }

    // (Re)add it's reference
    this.push(cell);
  }

//------------------------------------------------------------------------------

  /**
   * Delete value from index.
   */
  _delete(i) {

    // Get value
    const value = this._heap[i];

    // Index of last element
    const bottom = this.size() - 1;

    // If value is not the last
    if (bottom > 0) {

      // Swap val to back
      this._swap(i, bottom);
    }

    // Delete last
    this._heap.pop();

    // Delete key
    this._map.delete(value.key);

    // Bubble down
    this._siftDown(i);

    return value;
  }

//------------------------------------------------------------------------------

  _greater(i, j) {

    return this._comparator(
      this._heap[i],
      this._heap[j]
    );
  }

//------------------------------------------------------------------------------

  /**
   * Swap two vales in array.
   */
  _swap(i, j) {

    // Get keys
    let k1 = this._heap[i].key;
    let k2 = this._heap[j].key;

    // Swap keys
    this._map.set(k1, j);
    this._map.set(k2, i);

    // Swap values
    [this._heap[i], this._heap[j]] = [this._heap[j], this._heap[i]];
  }

//------------------------------------------------------------------------------

  /**
   * Bubble up.
   */
  _siftUp() {

    let node = this.size() - 1;

    while (node > 0 && this._greater(node, parent(node))) {

      this._swap(node, parent(node));
      node = parent(node);
    }
  }

//------------------------------------------------------------------------------

  /**
   * Bubble down
   */
  _siftDown(i) {

    let node = i;

    while (
      (left(node) < this.size() && this._greater(left(node), node)) ||
      (right(node) < this.size() && this._greater(right(node), node))
    ) {

      let maxChild = (right(node) < this.size() && this._greater(right(node), left(node))) ? right(node) : left(node);
      this._swap(node, maxChild);
      node = maxChild;
    }
  }
}
