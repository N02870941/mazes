// IIFE to expose Maze 'class' as
// a non-threadsafe Singleton
const Maze = (() => {

  // Single Maze instance
  let instance

  // Initialize singleton
  function init() {

    // Private attributes
    const grid = new Array()

    // Cells
    let source
    let target

    // Integers
    let r
    let c

//------------------------------------------------------------------------------

    /**
     * Makes sure row, cols, and width are valid.
     */
    function validate({rows=undefined, cols=undefined, wid=undefined}) {

      if (!rows || !cols || !wid) {

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

//------------------------------------------------------------------------------

    // Public attributes
    return {

      generated : false,

      solved : false,

      // Map for reconstructing a path
      parents : new Map(),

      // Stats on a given
      // walk of the maze
      walk : {

        visits    : 0,
        length    : 0,
        algorithm : undefined
      },

      /**
       * Creates new grid
       */
      create : function({rows=undefined, cols=undefined, wid=undefined}) {

        // Argument validation
        validate({rows:rows, cols:cols, wid:wid})

        r = rows
        c = cols

        // Reset data structures
        grid.length = 0
        this.parents.clear()

        // Rows
        for (let j = 0; j < r; j++) {

          // Cols
          for (let i = 0; i < c; i++) {

            // New cell
            grid.push(new Cell(i, j, wid));
          }
        }

        // Set default src and tgt
        source = grid[0]
        target = grid[grid.length-1]

        // It's just a grid to start with
        this.generated = false
        this.solved    = false

        this.resetWalk()
      },

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

          u.bounds &= masks.unset.LEFT;
          v.bounds &= masks.unset.RIGHT;

        } else if (x === -1) {

          u.bounds &= masks.unset.RIGHT;
          v.bounds &= masks.unset.LEFT;
        }

        // They are on top of each other
        if (y === 1) {

          u.bounds &= masks.unset.TOP;
          v.bounds &= masks.unset.BOTTOM;

        } else if (y === -1) {

          u.bounds &= masks.unset.BOTTOM;
          v.bounds &= masks.unset.TOP;
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

      },

      // Highlights a path
      highlight : function() {

        let stop = true;

        // Highlight current vertex
        current.shade();

        // Increment walk count
        maze.walk.length++;

        // Get previous vertex
        current = maze.parents.get(current.key);

        // If one came back
        if (current) {

          // Return false to indicate
          // we still have more vertices
          // in our path to highlight
          stop = false;
        }

        return stop;
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
