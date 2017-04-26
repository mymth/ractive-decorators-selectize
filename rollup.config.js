import babel from 'rollup-plugin-babel';
import multidest from 'rollup-plugin-multidest';
import uglify from 'rollup-plugin-uglify';
import { minify } from 'uglify-js-harmony';

let banner = `/*
  ractive-decorators-selectize
  ===============================================

  Version <%= pkg.version %>.

  This plugin is a decorator for Selectize.js.

  ==========================
*/
`.replace('<%= pkg.version %>', process.env.npm_package_version);

export default {
  entry: './src/ractive-decorators-selectize.js',
  moduleName: 'selectizeDecorator',
  banner,
  format: 'umd',
  plugins: [
    babel({
      exclude: 'node_modules/**',
      babelrc: false,
      presets: ['es2015-rollup'],
    }),
    multidest([
      {
        dest: 'ractive-decorators-selectize.min.js',
        plugins: [
          uglify({}, minify),
        ],
      },
    ]),
  ],
  dest: 'ractive-decorators-selectize.js',
};