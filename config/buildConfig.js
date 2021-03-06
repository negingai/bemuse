/* eslint no-global-assign: off */
/* REASON: When using TypeScript parser, sourceType:'module' is not respected.
 * It thinks that CommonJS module files are global scripts. */

let name = 'Bemuse'
let version = require('../package.json')
  .version.replace(/\.0$/, '')
  .replace(/\.0$/, '')

function gitRevision() {
  return require('child_process')
    .execSync('git rev-parse --short HEAD')
    .toString()
    .trim()
}

if (process.env.CONTEXT === 'deploy-preview') {
  name += 'DevMode'
  if (process.env.DEPLOY_PRIME_URL) {
    const m = process.env.DEPLOY_PRIME_URL.match(/\/\/(.*?)--/)
    version += `[${m[1]}]`
  }
  version += '@' + gitRevision()
} else if (process.env.CONTEXT === 'production') {
  name += 'DevMode'
  version += '+next[staging]@' + gitRevision()
} else if (!process.env.CI) {
  name += 'DevMode'
  version += '+local'
}

module.exports = { name, version }
