let gulp     = require('gulp');
let browser  = require('browser-sync').create();
var exec     = require('child_process').exec;

//------------------------------------------------------------------------------

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

gulp.task('watch-changes', () => {

  gulp.watch("./static/**/*.html", ['reload']);
  gulp.watch("./static/**/*.{css,scss}", ['reload']);
  gulp.watch("./static/**/*.{js,json}", ['reload']);
  gulp.watch("./static/**/*.{js,json}", ['reload']);
});

//------------------------------------------------------------------------------

gulp.task('reload', () => {

  browser.reload();
});

//------------------------------------------------------------------------------

gulp.task('dev', () => {

  let port   = 8080;
  let config = {proxy: "localhost:" + port};

  bash('node index.js ' + port);

  browser.init(config);

  gulp.start('watch-changes');
});
