let selectedConnPoint = null;
let connections = [];

function updateAllConnections() {
  connections.forEach(conn => updateConnection(conn));
}


function updateConnection(conn) {
  const pointA = conn.from;
  const pointB = conn.to;
  const rectA = pointA.getBoundingClientRect();
  const rectB = pointB.getBoundingClientRect();

  // Get center positions in viewport coordinates
  const viewportX1 = rectA.left + rectA.width / 2;
  const viewportY1 = rectA.top + rectA.height / 2;
  const viewportX2 = rectB.left + rectB.width / 2;
  const viewportY2 = rectB.top + rectB.height / 2;

  // Convert viewport coordinates to the draggable container's coordinate system
  // using the same logic as in your draggable element:
  const x1 = (viewportX1 - translateX) / scale;
  const y1 = (viewportY1 - translateY) / scale;
  const x2 = (viewportX2 - translateX) / scale;
  const y2 = (viewportY2 - translateY) / scale;

  // Calculate control points for a smooth cubic Bézier curve
  const dx = Math.abs(x2 - x1);
  const controlOffset = dx * 0.3;
  const c1x = x1 + (x2 > x1 ? controlOffset : -controlOffset);
  const c1y = y1;
  const c2x = x2 + (x1 > x2 ? controlOffset : -controlOffset);
  const c2y = y2;

  // Update the SVG path's 'd' attribute
  conn.path.setAttribute('d', `M ${x1} ${y1} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${x2} ${y2}`);
}


function createConnection(outputPoint, inputPoint) {
  // Prevent duplicate connections from the same output to input
  for (const conn of connections) {
    if (conn.from === outputPoint && conn.to === inputPoint) {
      return;
    }
  }
  const svgns = "http://www.w3.org/2000/svg";
  const path = document.createElementNS(svgns, 'path');
  path.setAttribute('stroke', '#494949');
  path.setAttribute('fill', 'none');
  path.setAttribute('stroke-width', '2');
  path.style.pointerEvents = "auto";

  path.setAttribute('_', `on click remove me`);
  document.querySelector('.svg-overlay').appendChild(path);
  connections.push({ from: outputPoint, to: inputPoint, path: path });
  updateConnection(connections[connections.length - 1]);
}


// Global click listener for connection points.
// Only allow a connection to start from an "output" and finish at an "input"
document.addEventListener('click', function (e) {
  if (e.target.classList.contains('conn-point')) {
    e.stopPropagation();
    const point = e.target;
    const type = point.getAttribute('data-type');
    if (!selectedConnPoint) {
      // Only start selection if the point is an output
      if (type === 'output') {
        selectedConnPoint = point;
        point.classList.add('selected');
      }
    } else {
      // When an output is already selected, only allow connecting to an input point
      if (type === 'input' && selectedConnPoint !== point) {
        // Optionally prevent self-connection (same node)
        if (selectedConnPoint.parentElement === point.parentElement) {
          selectedConnPoint.classList.remove('selected');
          selectedConnPoint = null;
          return;
        }
        createConnection(selectedConnPoint, point);
      }
      selectedConnPoint.classList.remove('selected');
      selectedConnPoint = null;
    }
  }
});

// Function to add a new connection point (input or output) to a node
function addConnectionPoint(node, type) {
  const newPoint = document.createElement('div');
  newPoint.classList.add('conn-point');
  newPoint.classList.add(type === 'input' ? 'input-conn-point' : 'output-conn-point');
  newPoint.setAttribute('data-type', type);
  // Adjust vertical positioning for additional points.
  // Count how many points of this type already exist
  const existing = node.querySelectorAll(`.conn-point[data-type="${type}"]`).length;
  // Here we nudge each extra point by 20px (adjust as needed)
  newPoint.style.top = `calc(50% + ${existing * 20}px)`;
  node.appendChild(newPoint);
}

// Initialize a node's connection controls (the add buttons)
function initNodeControls(node) {
  const addInputBtn = node.querySelector('.add-input-conn');
  const addOutputBtn = node.querySelector('.add-output-conn');
  if (addInputBtn) {
    addInputBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      addConnectionPoint(node, 'input');
    });
  }
  if (addOutputBtn) {
    addOutputBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      addConnectionPoint(node, 'output');
    });
  }
}



function reloadJs(src) {
  // Find the first script whose "src" ends with the given string.
  var scriptEl = document.querySelector('script[src$="' + src + '"]');
  if (!scriptEl) return;

  // Get the full src from that element.
  var fullSrc = scriptEl.getAttribute('src');

  // Remove all script elements with a src that ends with the fullSrc.
  var scripts = document.querySelectorAll('script[src$="' + fullSrc + '"]');
  scripts.forEach(function (el) {
    el.parentNode.removeChild(el);
  });

  // Create a new script element, set its src, and append it to the head.
  var newScript = document.createElement('script');
  newScript.src = fullSrc;
  document.head.appendChild(newScript);
}
