const links = [
  {
    text: "Home",
    name: "/index.html"
  },
  {
    text: "Intuition",
    name: "/pages/intuition.html"
  },
  {
    text: "Generting with backtracking",
    name: "/pages/backtrack.html"
  },
  {
    text: "Solving with DFS",
    name: "/pages/dfs.html"
  },
  {
    text: "Solving with BFS",
    name: "/pages/bfs.html"
  },
  {
    text: "Solving with Dijkstra's Algorithm",
    name: "/pages/dijkstra.html"
  },
  {
    text: "Solving with A* search",
    name: "/pages/aStar.html"
  },
  {
    text: "Performance comparison",
    name: "/pages/performance.html"
  }
]

let urlList = $('#url-list')

for (url of links) {
  urlList.append(`
    <li>
      <a name="${url.name}" onclick="navigate_to_page(this.name)">
        ${url.text}
      </a>
    </li>
  `)
}

// Hides the navbar menu
let closeMenu = function() {
  $('#navigation').prop('checked', false);

  // Resolve promise after 250ms, gives enough time for close animation to complete
  return new Promise(resolve => setTimeout(resolve, 250));
}

// By default the sidebare is hidden. Make sure we uncheck the nav checkbox
// so the menu is not out, then we can show the sidebar (make it clickable)
$(document).ready(function() {
    closeMenu()
    $('#sidebar').show()
})

// Close menu on Escape press
$(document).keyup(function(e) {
   if (e.keyCode == 27) {
      closeMenu();
  }
})

// Close menu if click happens outside of the sidebar
$(document).mouseup(function(e) {
  let sidebar = $("#sidebar")

  // if the target of the click isn't the container nor a descendant of the container, close the menue
  if (!sidebar.is(e.target) && sidebar.has(e.target).length === 0) {
      closeMenu()
  }
})

// Closes menu, then navigates to the href
let navigate_to_page = async function(href) {
  await closeMenu()

  document.location.href = href
}
