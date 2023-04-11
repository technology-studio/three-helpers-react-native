import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'

export default [
  {
    input: 'src/index.ts',
    output: {
      file: 'lib/index.js',
      format: 'cjs'
    },
    external: ['three', '@react-three/fiber', 'react', 'react-dom'],
    plugins: [
      commonjs(),
      resolve({
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }),
      typescript({
        declaration: true,
        exclude: 'node_modules/**'
      })
    ]
  }
]
