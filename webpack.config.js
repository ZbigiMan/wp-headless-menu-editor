const path = require('path')

const webpack = require('webpack')

const SCRIPTS_ENTRY = './src/app/index.js'
const SCRIPTS_OUTPUT = './scripts'
const SCRIPTS_FILENAME = 'menu_editor.js'

const STYLES_ENTRY = './src/scss/styles.scss'
const STYLES_OUTPUT = './styles'
const STYLES_FILENAME = 'styles.css'

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const extractSASS = new ExtractTextPlugin(STYLES_FILENAME)

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
    ]
  }, {
    mode: MODE,
    entry: STYLES_ENTRY,
    output: {
      path: path.resolve(__dirname, STYLES_OUTPUT),
      filename: STYLES_FILENAME
    },
    module: {
      rules: [{
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader',
            {
              loader: 'sass-loader',
              options: {
                includePaths: [
                  path.resolve('node_modules/semantic-ui-sass/')
                ]
              }
            }
          ]
        })
      }, {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000'
      }]
    },
    plugins: [
      extractSASS
    ]
  }]
}
