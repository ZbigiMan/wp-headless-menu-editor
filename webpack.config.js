const path = require('path')

const webpack = require('webpack')

const SCRIPTS_ENTRY = './src/app/index.js'
const SCRIPTS_OUTPUT = './scripts'
const SCRIPTS_FILENAME = 'menu_editor.js'

const STYLES_ENTRY = './src/scss/styles.scss'
const STYLES_OUTPUT = './styles'
const STYLES_FILENAME = 'styles.css'

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const miniCssExtractPlugin = new MiniCssExtractPlugin({
  filename: STYLES_FILENAME
})
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const optimizeCSSAssetsPlugin = new OptimizeCSSAssetsPlugin({
  cssProcessorOptions: {
    cssProcessor: require('cssnano'),
    cssProcessorPluginOptions: {
      preset: ['default', { discardComments: { removeAll: true } }]
    },
    canPrint: true
  }
})

const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = env => {
  const MODE = env && env.prod ? 'production' : 'development'
  const definePlugin = new webpack.DefinePlugin({
    MODE: JSON.stringify(MODE)
  })

  return [{
    mode: MODE,
    entry: SCRIPTS_ENTRY,
    output: {
      path: path.resolve(__dirname, SCRIPTS_OUTPUT),
      filename: SCRIPTS_FILENAME
    },
    module: {
      rules: [
        {
          test: /\.js/,
          type: 'javascript/auto',
          exclude: /node_modules/,
          use: [
            'eslint-loader', 'babel-loader'
          ]
        },
        {
          test: /\.json/,
          type: 'javascript/auto',
          use: [require.resolve('json-loader')]
        }
      ]
    },
    plugins: [
      definePlugin
    ],
    performance: { hints: false }
  }, {
    mode: MODE,
    entry: STYLES_ENTRY,
    output: {
      path: path.resolve(__dirname, STYLES_OUTPUT)
    },
    module: {
      rules: [
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                hmr: process.env.NODE_ENV === 'development'
              }
            },
            'css-loader',
            'sass-loader'
          ]
        },
        {
          test: /\.(png|woff|woff2|eot|ttf|svg)$/,
          loader: 'url-loader?limit=100000'
        }]
    },
    plugins: [
      miniCssExtractPlugin,
      new webpack.ProgressPlugin(),
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: [
          path.resolve(__dirname, STYLES_OUTPUT + '/*.*')
        ],
        cleanAfterEveryBuildPatterns: [
          path.resolve(__dirname, STYLES_OUTPUT + '/main.js')
        ]
      })
    ],
    optimization: {
      minimizer: [
        optimizeCSSAssetsPlugin
      ]
    },
    performance: { hints: false }
  }]
}
