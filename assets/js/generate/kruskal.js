const kruskal = {
  init : () => {
    let top
    let bottom
    let right
    let left

    funda    = new Funda()
    disjoint = new DijointSet()

    // Add all nodes to disjoint set
    grid.forEach(c => disjoint.add(c))

    // Add all vertical walls to funda
    for (let j = 0; j < rows - 1; j++) {

      for (let i = 0; i < cols - 1; i++) {

        left  = Cell.get(i, j)
        right = Cell.get(i+1, j)

        funda.push(new Wall(left, right))
      }
    }

    // Horizontal walls
  }

  kruskal : () => {

  }
}
