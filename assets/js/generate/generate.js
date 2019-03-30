/**
 * Generates the maze.
 */
function generate() {

  // Fire generating event
  let algorithm = trigger.generating();

  // Change main event
  // loop algorithm to
  // the specified generator
  maze.action = () => showMessage(strings.messages.generate.start);

  // List of callbacks
  maze.tasks = [
    algorithm,
    maze.clean,
    () => showMessage(strings.messages.generate.subtractV),
    loadFunda,
    subtract.vertical,
    () => showMessage(strings.messages.generate.subtractH),
    loadFunda,
    subtract.horizontal,
    maze.clean,
    trigger.prepared,
    () => showMessage(strings.messages.generate.done)
  ];

  // Initialize the grid
  trigger.initializing()

  // Initialize the queue
  queue = new List()

  // Start at source
  maze.current = maze.source();

  // Start the process in async mode
  if (animated()) {

    if (autosolve())
      maze.tasks.push(solve)

    start();

  // Start synchronously
  } else {

    start()

    if (autosolve())
      solve()
  }


}

//------------------------------------------------------------------------------

/**
 * Create a new funda, mark all
 * nodes as unvisited, and add them
 * to the funda.
 */
function loadFunda() {

  queue = new Funda()

  maze.forEach(c => {

    c.visited = false

    queue.push(c)
  })

  return true
}
