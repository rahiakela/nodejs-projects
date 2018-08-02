require('ts-node').register({
  project: false,
  ignoreDiagnostics: true,
});
require('./gulpfile-build.ts');
