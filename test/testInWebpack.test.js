import webpack from 'webpack';
import fsx from 'fs-extra';
import path from 'path';

import config from './fixture/webpack.config';

describe('test in webpack', function () {
  it('should be built successfully in webpack', function(done) {

    function cb (err, stats) {
      if (err) {
        console.error(err.stack || err);
        if (err.details) {
          console.error(err.details);
        }
      }
      expect(err).toBeNull();
      const builtCSS = fsx.pathExistsSync(path.join(__dirname, './assets/css'));
      const builtJS = fsx.pathExistsSync(path.join(__dirname, './assets/js'));
      const builtTemplates = fsx.pathExistsSync(path.join(__dirname, './assets/templates'));
      expect(builtJS).toBeTruthy();
      expect(builtCSS).toBeTruthy();
      expect(builtTemplates).toBeTruthy();
      fsx.removeSync(path.join(__dirname, './assets'));
      done();
    };

    fsx.removeSync(path.join(__dirname, './assets'));
    webpack (config, cb );
  })
})