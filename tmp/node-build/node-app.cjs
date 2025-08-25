'use strict';

var node_fs = require('node:fs');
var node_path = require('node:path');

function readConfig(path) {
  const content = node_fs.readFileSync(node_path.join(process.cwd(), path), "utf-8");
  return JSON.parse(content);
}
console.log("Node.js application");

exports.readConfig = readConfig;
//# sourceMappingURL=node-app.cjs.map
//# sourceMappingURL=node-app.cjs.map