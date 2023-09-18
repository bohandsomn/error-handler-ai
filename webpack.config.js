const path = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = (environment, args) => ({
  mode: args.mode ?? 'production',
  entry: './src/index.ts',
  target: 'node',
  externals: [nodeExternals()],
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  watch: args.mode === 'development',
})
