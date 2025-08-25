import { readFileSync } from 'node:fs';
import { join } from 'node:path';

function readConfig(path) {
  const content = readFileSync(join(process.cwd(), path), "utf-8");
  return JSON.parse(content);
}
console.log("Node.js application");

export { readConfig };
//# sourceMappingURL=node-app.js.map
//# sourceMappingURL=node-app.js.map