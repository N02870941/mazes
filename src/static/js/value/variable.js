// TODO - Stop using JS stack, and switch
// to custom Stack / Queue, then put queue into
// maze so we reference maze.queue instead.
// that way, we have ZERO global variables
// and everything is constant, or encapsulated
// in an object.

const stack = [];
let queue;

// The main maze
const maze = Maze.getInstance();
