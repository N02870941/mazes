// IIFE to expose Maze 'class' as
// a non-threadsafe Singleton. Does thread-safety
// matter in the browser? IDK. But, to be
// on the safe side, we make it a singleton.
const Maze = (() => {

// PRIVATE ATTRIBUTES START HERE
//==============================================================================

  // Single Maze instance
  let instance

  // Initialize singleton
  function init() {

    // Private attributes
    const grid  = new Array()

    // p5 Canvas object that
    // represents the html canvas
    let canvas

    // Cells
    let source
    let target

    // Row, col count
    let r
    let c

//------------------------------------------------------------------------------

    /**
     * Makes sure row, cols, and width are valid.
     */
    function validate({
      rows   = undefined,
      cols   = undefined,
      pathW  = undefined,
      width  = undefined,
      height = undefined
    }) {

      if (
        !rows   ||
        !cols   ||
        !pathW  ||
        !width  ||
        !height
      ) {

        throw new Error('Row / col count  and width must be positive integers')
      }
    }

//------------------------------------------------------------------------------

    /**
     * Computes index of cell by cartesian coordinates
     */
    function index(i, j) {

      if (
        i < 0   ||
        j < 0   ||
        i > c-1 ||
        j > r-1) {

        return -1;
      }

      return i + j * c;
    }

// PUBLIC ATTRIBUTES START HERE
//==============================================================================

    // Public attributes
    return {

      // Current cell during walk of maze
      current : undefined,

      // Booelan flags that represent state of maze
      generated : false,
      solved    : false,

      // Number of walls to subtract when generating maze
      subtractionsV : 0,
      subtractionsH : 0,

      // Map for reconstructing a path (during maze solving)
      parents : new Map(),

      // Current task (are we generating or solving)
      action : undefined,

      // Tasks queue of operations we can perform on
      // the mazes such as generate, solve, subtract walls, etc.
      tasks : [],

      // Stats about a given walk of the maze
      walk : {
        visits    : 0,
        length    : 0,
        algorithm : undefined
      },

      // Images taken of the maze at various points at runtime
      images : {
        maze     : undefined,
        solution : undefined,
        frames   : []
      },

      // TODO - MANHATTAN IS OVEREVESTIMATING BY 2, WHY?????
      heuristic : Cell.heuristics.manhattan,

      /**
       * Creates new grid
       */
      create : function({
        pathW  = undefined,
        width  = undefined,
        height = undefined,
        rows   = undefined,
        cols   = undefined,
        walls  = {
          vertical   : undefined,
          horizontal : undefined
        }
      }) {

        // Argument validation
        validate({
          rows   : rows,
          cols   : cols,
          pathW  : pathW,
          width  : width,
          height : height
        })

        // Create p5 canvas object
        canvas = createCanvas(
          width,
          height
        );

        // Assign canvas to inline html element
        canvas.parent(elements.canvas.MAIN);

        // Init canvas
        r = rows
        c = cols

        // Reset data structures
        grid.length = 0
        this.parents.clear()

        // It's just a grid to start with
        // so we are neither in the generated
        // state, nor the solved state.
        this.generated = false
        this.solved    = false

        this.resetWalk()

        // Rows
        for (let j = 0; j < r; j++) {

          // Cols
          for (let i = 0; i < c; i++) {
            let t = new Cell(i, j, pathW)

            t.clear()
            grid.push(t)
          }
        }

        // Set default source to be top left node,
        // and default target to be the bottom right node
        source = grid[0]
        target = grid[grid.length-1]

        // Get subtraction count from sliders, so we know how
        // many walls we should subtract. This effectively creates
        // multiple solutions to the maze. Otherwise, there would
        // only be 1 solution - a walk of the minimum spanning tree.
        this.subtractionsV = subtractions.vertical(walls.vertical);
        this.subtractionsH = subtractions.horizontal(walls.horizontal);
      },

      /**
       * Resets the current walk.
       */
      resetWalk : function(algo) {
        this.walk.visits    = 0
        this.walk.length    = 0
        this.walk.algorithm = algo || undefined
      },

      /**
       * Specifies source in search.
       */
      source : function(src) {
        if (src)
          source = src

        return source
      },

      /**
       * Specifies target in search.
       */
      target : function(tgt) {
        if (tgt)
          target = tgt

        return target
      },

      /**
       * Performs operation on each cell in grid.
       */
      forEach : function(operation) {
        grid.forEach(operation)
      },

      /**
       * Get cell by cartesian coordinates.
       */
      get : function (i, j) {
        return grid[index(i, j)]
      },

      /**
       * Deletes a wall between Cell u and Cell v
       */
      pave : function(u, v) {

        // Vertical and horizontal
        // distances between two cells
        const x = u.i - v.i;
        const y = u.j - v.j;

        // They are next to each other
        if (x === 1) {

          u.bounds &= Cell.masks.unset.LEFT;
          v.bounds &= Cell.masks.unset.RIGHT;

        } else if (x === -1) {

          u.bounds &= Cell.masks.unset.RIGHT;
          v.bounds &= Cell.masks.unset.LEFT;
        }

        // They are on top of each other
        if (y === 1) {

          u.bounds &= Cell.masks.unset.TOP;
          v.bounds &= Cell.masks.unset.BOTTOM;

        } else if (y === -1) {

          u.bounds &= Cell.masks.unset.BOTTOM;
          v.bounds &= Cell.masks.unset.TOP;
        }

        // Update view
        u.clear()
        v.clear()
      },

      // Resets coloring, cost,
      // heuristic, and visited status
      reset : function() {

        this.forEach( c => {

          c.heuristic = 0
          c.cost      = Infinity
          c.visited   = false
          c.clear()
        })

        return true
      },

      /**
       * Removes any highlighting
       * from all cells in grid.
       */
      clean : function() {

        grid.forEach( c => c.clear())

        return true
      },

      // Highlights a path
      highlight : function() {

        let stop = true;

        // Highlight current vertex
        maze.current.shade();

        // Increment walk count
        maze.walk.length++;

        // Get previous vertex
        maze.current = maze.parents.get(maze.current.key);

        // If one came back
        if (maze.current) {

          // Return false to indicate
          // we still have more vertices
          // in our path to highlight
          stop = false;
        }

        return stop;
      },

      /**
       * Saves the maze into a variable. This
       * way, we can continue to solve the maze
       * and print the original maze later.
       */
      saveMaze : function() {

        maze.images.maze = canvas.get()
      },

      /**
       * Saves the solved maze into a variable.
       */
      saveSolution : function() {

        maze.images.solution = canvas.get()
      },

      /**
       * Takes a screenshot of the maze.
       */
      screenshot : function() {
        maze.images.frames.push(canvas.get())

        return true
      },

      /**
       * Labels a cell visited.
       */
      visit : function(cell) {

        this.walk.visits++

        if (!cell.visited) {
          cell.visited = true
        }

        cell.gradient()
      }
    }
  }

  // Only expose getInstance(). This way
  // we ensure that we only have one instance
  // of the maze object in memory at a time.
  return {

    // Returns reference to Maze singleton
    getInstance : function() {

        if (!instance)
          instance = init()

        return instance
    }
  };

})();
