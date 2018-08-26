// IIFE to expose Maze 'class' as
// a non-threadsafe Singleton
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
     * Computes index of cell
     * by cartesian coordinates
     */
    function index(i, j) {

      if (
        i < 0      ||
        j < 0      ||
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

      // Current cell in
      // walk of maze
      current : undefined,

      // Booelan flags
      generated : false,
      solved    : false,

      // Number of walls to subtract
      subtractionsV : 0,
      subtractionsH : 0,

      // Map for reconstructing a path
      parents : new Map(),

      // Current task
      action : undefined,

      // Tasks queue
      tasks : [],

      // Stats on a given
      // walk of the maze
      walk : {

        visits    : 0,
        length    : 0,
        algorithm : undefined
      },

      // Images taken of the
      // maze at various points
      // at runtime
      images : {

        maze     : undefined,
        solution : undefined
      },

      // TODO - MANHATTAN IS OVEREVESTIMATING BY 2, WHY?????

      // Default heuristic is euclidian distance
      // heuristic : Cell.heuristics.euclidian,
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
        this.generated = false
        this.solved    = false

        // Walk reset to 0
        this.resetWalk()

        // Rows
        for (let j = 0; j < r; j++) {

          // Cols
          for (let i = 0; i < c; i++) {

            // New cell
            let t = new Cell(i, j, pathW)

            t.clear()

            grid.push(t)
          }
        }

        // Set default src and tgt
        source = grid[0]
        target = grid[grid.length-1]

        // Get subtraction count from sliders
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
       * Performs operation on
       * each cell in grid.
       */
      forEach : function(operation) {

        grid.forEach(operation)
      },

      /**
       * Get cell by
       * cartesian coordinates.
       */
      get : function (i, j) {

        return grid[index(i, j)]
      },

      // Deletes a wall between
      // Cell u and Cell v
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
       * Saves the maze into a variable.
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

  // Only expose getInstance()
  return {

    // Returns reference to
    // the single Maze instance
    getInstance : function() {

        if (!instance)
          instance = init()

        return instance
    }
  };

})();
