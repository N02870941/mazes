let gulp    = require('gulp');
let browser = require('browser-sync').create();
let exec    = require('child_process').exec;

//------------------------------------------------------------------------------

/**
 * Runs a commandline command asynchronously.
 */
function bash(command) {

  exec(command, (err, stdout, stderr) => {

    if (stdout) {

      console.log(stdout);
    }

    if (stderr) {

      console.log(stderr);
    }

  });
}

//------------------------------------------------------------------------------

/**
 * Watch changes on all static files.
 */
gulp.task('watch-changes', () => {

  gulp.watch("./static/**/*.html", ['reload']);
  gulp.watch("./static/**/*.{css,scss}", ['reload']);
  gulp.watch("./static/**/*.{js,json}", ['reload']);
  gulp.watch("./static/**/*.{js,json}", ['reload']);
});

//------------------------------------------------------------------------------

/**
 * Refreshes we browser.
 */
gulp.task('reload', () => {

  browser.reload();
});

//------------------------------------------------------------------------------

/**
 * Starts serving page on
 * port 8080 with browser synch.
 */
gulp.task('dev', () => {

  let port   = 8080;
  let config = {proxy: "localhost:" + port};

  bash('node index.js ' + port);

  browser.init(config);

  gulp.start('watch-changes');
});
