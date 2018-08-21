class DisjointSet {

  constructor() {

    this.map = new Map()
  }

//------------------------------------------------------------------------------

  /**
   * Determines if the set
   * contains a specified element.
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

  size() {

    return map.length
  }

}

class Node {

  constructor(data) {

    this.rank   = 0
    this.data   = data
    this.parent = parent
  }

//------------------------------------------------------------------------------

  compareTo(node) {

    return Math.abs(rank) - Math.abs(node.rank)
  }
}
