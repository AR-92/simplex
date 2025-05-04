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
