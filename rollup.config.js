import babel from 'rollup-plugin-babel';
import multidest from 'rollup-plugin-multidest';
import uglify from 'rollup-plugin-uglify';
import { minify } from 'uglify-js-harmony';

export default {
  entry: './src/ractive-decorators-selectize.js',
  moduleName: 'selectizeDecorator',
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
