/**
 * Sorts an array of values. An optional 2 parameter comparator function is available
 * to specify ordering. If no comparator is supplied, then the values will be sorted
 * based on their primitive values via the Object.prototype.valueOf() function.
 */
function sort(array, comparator = (a, b) => a.valueOf() - b.valueOf()) {
  quicksort(array, 0, array.length-1, comparator)

  return array
}

//------------------------------------------------------------------------------

/**
 * Quicksort using Hoare partitioning scheme.
 */
function quicksort(a, lo, hi, compare) {

  if (lo >= hi)
    return

  let i
  let j
  let r
  let pivot

  i = lo
  j = hi
  r = Math.floor(Math.random() * ((hi+1) - lo) + lo)

  pivot = a[r];

  while (i <= j) {
    while (compare(a[i], pivot) < 0)
      i++

    while (compare(a[j], pivot) > 0)
      j--

    if (i <= j) {
      [a[j], a[i]] = [a[i], a[j]] // swap a[i] and a[j]

      i++
      j--
    }
  }

  if (lo < j)
    quicksort(a, lo, j, compare)

  if (i < hi)
    quicksort(a, i, hi, compare)
}
