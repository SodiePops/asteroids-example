import typescript from 'rollup-plugin-typescript'
import resolveNodeModules from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import builtins from 'rollup-plugin-node-builtins'
import builtinsGlobals from 'rollup-plugin-node-globals'

const config = {
  entry: 'src/index.ts',
  format: 'iife',
  dest: 'dist/game.js',
  moduleName: 'smashin',
  sourceMap: true,

  plugins: [
    typescript({ typescript: require('typescript')} ),
    resolveNodeModules({ module: true, jsnext: true, main: true }),
    commonjs({
      namedExports: {
        '../tudi/node_modules/pixi.js/lib/index.js': ['autoDetectRenderer', 'Container', 'Sprite', 'SCALE_MODES'],
        '../tudi/node_modules/pixi.js/lib/polyfill/Math.sign.js': ['default'],
      }
    }),
    builtins(),
    builtinsGlobals(),
  ],
}

if (process.env.NODE_ENV === 'development') {
  config.plugins.push(require('rollup-plugin-serve')('.'), require('rollup-plugin-livereload')())
}

export default config
