
/**
 * Main event loop that repeats forever.
 */
async function draw() {

  generated = dfs();

  if (generated) {

    await sleep(1000);

    noLoop();

    let first = grid[0];
    let last  = grid[grid.length - 1];

    first.walls[3] = false
    last.walls[1]  = false;

    first.show();
    last.show();
  }
}
