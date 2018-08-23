// All string messages
const strings = {

  GENERATE_BUTTON : 'Generate',
  SOLVE_BUTTON    : 'Solve',
  EXPORT_BUTTON   : 'Export',
  DOWNLOAD_MSG    : 'Would you like to download the solution as well?',
  WAIT_FOR_MAZE   : 'Please wait until the maze is fully generated.',
  WAIT_TO_SOLVE   : 'Please wait util the maze is be fully solved',
  ALREADY_SOLVED  : 'The maze it already solved',
  CONFIRM_CANCEL  : 'Are you sure you want to cancel?',
  YES             : 'Yes',
  NO              : 'No',

  messages : {

    initial : {
      title   : 'Welcome!',
      content : 'Generate a maze by adjusting the sliders, '            +
                'and selecting a generator algorithm. When it\'s done ' +
                'you can select a solver algorithm and click the '      +
                '"Solve" button to show the solution.'
    },

    generate : {

      start     : {title : 'Generating...', content : 'Please wait while the maze is being generated.'},
      done      : {title : 'Done!',         content : 'The maze is done!'},
      subtractV : {title : 'Editing...',    content : 'Removing vertical walls'},
      subtractH : {title : 'Editing...',    content : 'Removing horizontal walls'}
    },

    solve : {

      start          : {title : 'Solving...',   content : 'Please wait while the maze is being solved.'},
      reconstructing : {title :'Target found!', content : 'Reconstructing path'},
      getWalkInfo    : () => {

        return {

          title   :'Solved!',
          content : `${maze.walk.algorithm.name} found a path of
                    length ${maze.walk.length} in ${maze.walk.visits} steps.`
          }
      }
    }

  }
};
