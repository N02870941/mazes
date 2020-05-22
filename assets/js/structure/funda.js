/**
 * Data structure with constant time
 * Insert, delete, search, and get random.
 *
 * https://www.geeksforgeeks.org/design-a-data-structure-that-supports-insert-delete-search-and-getrandom-in-constant-time/
 */
class Funda {

  /**
   * Constructs empty funda.
   */
  constructor() {
    this.map  = new Map()
    this.list = new Array()
  }

//------------------------------------------------------------------------------

  /**
   * Inserts new value into bag if it is not already present.
   */
  push(element) {

    // No duplicate or falsy values
    if (!element || this.map.has(element)) {

      return
    }

    // Last index in list
    let i = this.list.length

    // Add to list
    this.list.push(element)

    // Store location in map
    this.map.set(element, i)
  }

//------------------------------------------------------------------------------

  /**
   * Removes and returns a random value from the funda.
   */
  pop() {
    let element = this.get()

    if (element) {
      this.delete(element)
    }

    return element
  }

//------------------------------------------------------------------------------

  /**
   * Deletes an element from the funda.
   */
  delete(element) {
    let temp
    let last
    let size
    let j
    let i

    // Get associated index
    i = this.map.get(element)

    // Nothing came back
    if (i === undefined || i === null) {
      return
    }

    // Last value
    size = this.list.length

    // Last index
    j = size-1

    // Swap if the last
    // the random index is
    // not the last index
    if (i !== j) {

      // Last value
      last = this.list[j]
      temp = this.list[i]

      // Swap
      this.list[i] = last
      this.list[j] = temp

      // Update index, O(1)
      this.map.set(last, i)
    }

    // Delete key from map, O(1)
    this.map.delete(element)

    // Remove last, O(1)
    this.list.pop()
  }

//------------------------------------------------------------------------------

  /**
   * Determines if the funda has an element or not.
   */
  has(element) {
    return this.map.has(element)
  }

//------------------------------------------------------------------------------

  /**
   * Returns random value from the funda.
   */
  get() {

    // Random number
    let r = Math.random() * this.list.length

    // Round to integer
    let i = Math.floor(r)

    // Random value
    return this.list[i]
  }

//------------------------------------------------------------------------------

  /**
   * Returns number of elements in funda.
   */
  size() {

    return this.list.length
  }

//------------------------------------------------------------------------------

  /**
   * Determines whether or not the funda is empty.
   */
  empty() {
    return this.size() === 0
  }
}
