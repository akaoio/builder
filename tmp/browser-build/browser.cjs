'use strict';

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

exports.DOMHelper = DOMHelper;
exports.ready = ready;
//# sourceMappingURL=browser.cjs.map
//# sourceMappingURL=browser.cjs.map