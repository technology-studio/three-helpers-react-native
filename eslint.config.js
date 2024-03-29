const txoConfig = require('eslint-config-txo-typescript')

/** @type {import('eslint').Linter.FlatConfig[]} */
const config = [
  ...txoConfig.default,
  {
    ignores: [
      'src/types',
      'src/index.d.ts',
      'rollup.config.js',
    ],
  },
]

module.exports = config
