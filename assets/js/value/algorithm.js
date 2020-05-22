// Names of supported algorithms
const algorithms = {

  generator : {
    BFS     : 'bfs',
    DFS     : 'dfs',
    HYBRID  : 'hybrid',
    KRUSKAL : 'kruskal',
    PRIM    : 'prim',

    subtract : {
      VERTICAL   : 'vertical',
      HORIZONTAL : 'horizontal'
    }
  },

  solver : {
    BFS        : 'BFS',
    DFS        : 'DFS',
    A_STAR     : 'aStar',
    DIJKSTRA   : 'dijkstra',
    FOLLOWER_L : 'follower-left',
    FOLLOWER_R : 'follower-right'
  },

  visualizer : {
    HIGHLIGHT : 'highlight'
  }

};

// Arrays of functions used for generating, solving, and visualizing
const solvers     = [];
const generators  = [];
const visualizers = [];
