module.exports = api => {
  api.cache(false)
  return {
    presets: [
      ['@babel/env', { 'modules': 'commonjs' }],
      '@babel/preset-react'
    ],
    plugins: [
      ['@babel/plugin-proposal-decorators', { 'legacy': true }],
      ['@babel/plugin-proposal-class-properties', { 'loose': true }],
      '@babel/plugin-transform-runtime',
      'add-module-exports'
    ],
    ignore: [/[\\]core-js/, /@babel[\\]runtime/]
  }
}
