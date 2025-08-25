class DOMHelper {
  static createElement(tag) {
    return document.createElement(tag);
  }
  static querySelector(selector) {
    return document.querySelector(selector);
  }
}
function ready(callback) {
  if (document.readyState !== "loading") {
    callback();
  } else {
    document.addEventListener("DOMContentLoaded", callback);
  }
}

export { DOMHelper, ready };
//# sourceMappingURL=browser.js.map
//# sourceMappingURL=browser.js.map