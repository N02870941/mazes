// IIFE to expose Maze 'class' as
// a non-threadsafe Singleton
const Maze = (() => {

  // Single instance
  let instance


  // Initialize singleton
  function init() {

    // Private attributes
    const grid = new Array()
    const path = new Array()

    let generated
    let solved
    let source
    let target

//------------------------------------------------------------------------------

    /**
     * Makes sure row, cols, and width are valid.
     */
    function validate({rows=undefined, cols=undefined, wid=undefined}) {

      if (!rows || !cols || !wid) {

        throw new Error('Row / col count  and width must be truthy')
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
        i > cols-1 ||
        j > rows-1) {

        return -1;
      }

      return i + j * cols;
    }

//------------------------------------------------------------------------------

    // Public attributes
    return {

      /**
       * Creates new grid
       */
      create : function({rows=undefined, cols=undefined, wid=undefined}) {

        // Argument validation
        validate({rows:rows, cols:cols, wid:wid})

        // Reset arrays
        grid.length = 0
        path.length = 0

        // Rows
        for (let j = 0; j < rows; j++) {

          // Cols
          for (let i = 0; i < cols; i++) {

            // New cell
            grid.push(new Cell(i, j, wid));
          }
        }

        // Set default src and tgt
        source = grid[0]
        target = grid[grid.length-1]

        // It's just a grid to start with
        generated = false
        solved    = false
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

let m = Maze.getInstance()

m.create({rows:5, cols:5, wid:1})
m.create({rows:2, cols:2, wid:1})

m.forEach( (c) => console.log(c) )
