/**
 * Implementation of Disjoint set for use with Kruskal's algorithm.
 */
class DisjointSet {

  /**
   * Constructs empty disjoint set.
   */
  constructor() {
    this.map = new Map()
  }

//------------------------------------------------------------------------------

  /**
   * Determines if the set contains a specified element.
   */
  has(element) {
    return this.map.has(element)
  }

//------------------------------------------------------------------------------

  /**
   * Adds an element to set.
   */
  add(element) {
    this.map.set(element, new Node(element))
  }

//------------------------------------------------------------------------------

  /**
   * Find the root node associated with a specified node.
   */
  _find(node) {
    t = node

    while (t !== t.parent) {
      t = t.parent
    }

    return t
  }

//------------------------------------------------------------------------------

  /**
   * Find element by value.
   */
  find(element) {
    let node = this._find(this.get(element))

    if (node === node.parent) {
      return node.data
    }

    node.parent = find(node.parent)

    return node.parent.data
  }

//------------------------------------------------------------------------------

  /**
   * Get element by value.
   */
  get(element) {
    let node = this.map.get(element)

    if (!node) {
      this.add(element)
    }

    return node
  }

//------------------------------------------------------------------------------

  /**
   * Union between two inner sets.
   */
  union(first, second) {
    let one = this._find(this.get(first));
    let two = this._find(this.get(second));

    // Same element
    if (one == two) {

      return;
    }

    // Compare by rank
    let comparison = one.compareTo(two);

    // Two is larger than one
    if (comparison < 0) {

      one.parent = two;

    // One is larger than two
    } else if (comparison > 0) {

      two.parent = one;

    // They are equal, so pick
    // two, and decrease one's rank
    } else {

      two.parent = one;
      one.rank--;
    }
  }

//------------------------------------------------------------------------------

  /**
   * Returns number of values in the disjoint set.
   */
  size() {
    return map.length
  }
}

/**
 * Inject inner final static class.
 */
Object.defineProperty(DisjointSet, 'Node', {
  value : class Node {
    constructor(data) {

      this.rank   = 0
      this.data   = data
      this.parent = parent
    }

    compareTo(node) {

      return Math.abs(rank) - Math.abs(node.rank)
    }
  },

  writable     : false,
  enumerable   : false,
  configurable : false
});
