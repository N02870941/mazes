// const top = 0;
const parent = i => ((i + 1) >>> 1) - 1;
const left = i => (i << 1) + 1;
const right = i => (i + 1) << 1;

// https://stackoverflow.com/questions/42919469/efficient-way-to-implement-priority-queue-in-javascript

class Heap {

  constructor(comparator = (a, b) => a.cost < b.cost) {

    this._map        = new Map();
    this._heap       = [];
    this._comparator = comparator;
  }

  size() {

    return this._heap.length;
  }

  empty() {

    return this.size() == 0;
  }

  peek() {

    return this._heap[0];
  }

  push(value) {

    // Already have the key
    if (this._map.has(value.key)) {

      // So just decrease key
      return this.replace(value);
    }

    // Add to internal array
    this._heap.push(value);

    // Store it's index
    this._map.set(value.key, this._heap.length-1);

    // Bubble up
    this._siftUp();

    return this.size();
  }

  pop() {

    // Get min value
    const value  = this.peek();

    // Index of last element
    const bottom = this.size() - 1;

    // If value is not the last
    if (bottom > 0) {

      // Swap bottom to top
      this._swap(0, bottom);
    }

    // Pop it off
    this._heap.pop();

    // Delete key for popped value
    this._map.delete(value.key);

    // Bubble root down
    this._siftDown();

    return value;
  }

  replace(element) {

    console.log('here')

    // Get top value
    const old = this.peek();

    // Put new value at top
    this._heap[0] = element;

    // Bubble down
    this._siftDown();

    return old;
  }

  _greater(i, j) {

    return this._comparator(
      this._heap[i],
      this._heap[j]
    );
  }

  _swap(i, j) {

    let k1 = this._heap[i].key;
    let k2 = this._heap[j].key;

    this._map.set(this._heap[i], k2);
    this._map.set(this._heap[j], k1);

    [this._heap[i], this._heap[j]] = [this._heap[j], this._heap[i]];
  }

  _siftUp() {

    let node = this.size() - 1;

    while (node > 0 && this._greater(node, parent(node))) {

      this._swap(node, parent(node));
      node = parent(node);
    }
  }

  _siftDown() {

    let node = 0;
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
