/**
 * List Object that enqueues to back and supports dequeue from both
 * the front and the back.
 */
function List() {

  // Private array
  let list = new Array()

  /**
   * Dequeues from back.
   */
  this.pop = () => list.pop()

  /**
   * Dequeues from front.
   */
  this.shift = () => list.shift()

  /**
   * Enqueues to back.
   */
  this.push = (element) => list.push(element)

  /**
   * Returns number of elements in list.
   */
  this.size = () => list.length

  /**
   * Determines if the list has
   * a specified element. An optional
   * comparator is allowed as a second
   * argument. If none is provided,
   * strict equality is used.
   */
  this.has = (element, comparator = (a, b) => a === b) => {

    for (let i = 0; i < list.length; i++) {
      if (comparator(list[i], element))
        return true
    }

    return false
  }

  /**
   * Sorts the list with an optional comaprator.
   */
  this.sort = (comparator) => sort(list, comparator)

  /**
   * Operate on each element in list.
   */
  this.forEach = (operation) => list.forEach(operation)
}
