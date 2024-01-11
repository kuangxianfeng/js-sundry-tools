const resolve = require('@rollup/plugin-node-resolve')
const typescript = require('@rollup/plugin-typescript')
const commonjs = require('@rollup/plugin-commonjs')
const { terser } = require('rollup-plugin-terser')
const fs = require('fs')
const path = require('path')

function deleteMediaDir() {
    return {
        name: 'delete-media-dir',
        writeBundle() {
            try {
                const mediaDir = path.resolve(__dirname, 'lib', 'test')
                fs.rm(mediaDir, { recursive: true }, () => {
                    console.log('..')
                })
            } catch {}
        }
    }
}
module.exports = {
    input: './src/index.ts',
    output: [
        {
            dir: 'lib',
            format: 'cjs',
            entryFileNames: '[name].cjs.js',
            sourcemap: false // 是否输出sourcemap
        },
        {
            dir: 'lib',
            format: 'esm',
            entryFileNames: '[name].esm.js',
            sourcemap: false // 是否输出sourcemap
        },
        {
            dir: 'lib',
            format: 'umd',
            entryFileNames: '[name].js',
            name: 'jsSundryTools', // umd模块名称，相当于一个命名空间，会自动挂载到window下面
            sourcemap: false,
            plugins: [terser()]
        }
    ],
    plugins: [deleteMediaDir(), resolve(), commonjs(), typescript({ module: 'ESNext' })]
}
