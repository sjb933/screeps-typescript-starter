const config = require('config');
const request = require('request');
const fs = require('fs');

const ENDPOINT = config.get('screeps.endpoint');
const EMAIL = config.get('screeps.auth.email');
const PASS = config.get('screeps.auth.pass');
const BRANCH = config.get('screeps.branch')

console.log('\n\nDeploying to server:', ENDPOINT);

if (!EMAIL || !PASS) {
  console.error('  -> ERROR:  Must set ENV vars to deploy: SCREEPS_EMAIL, SCREEPS_PASS')
  process.exit(1);
}

let opts = {
  auth: { user: EMAIL, pass: PASS },
  json: {
    branch: BRANCH,
    modules: {
      'main': fs.readFileSync('./build/main.js', { encoding: 'utf8' }),
      'main.js.map': fs.readFileSync('./build/main.js.map.js', { encoding: 'utf8' })
    }
  }
}

request.post(ENDPOINT, opts, (err, res, body) => {
  err ? console.error('  -> ERROR:', err) : console.log('  ->', body);
});
