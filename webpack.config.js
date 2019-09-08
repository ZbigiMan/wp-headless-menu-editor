const path = require('path')

const webpack = require('webpack')

const scriptsEntry = './src/app/index.js'
const scriprsOutput = './scripts'
const scriprsFilename = 'menu_editor.js'

const stylesEntry = './src/scss/styles.scss'
const stylesOutput = './styles'
const stylesFilename = 'styles.css'

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const extractSASS = new ExtractTextPlugin(stylesFilename)

module.exports = env => {
  const MODE = env && env.prod ? 'production' : 'development'

  const definePlugin = new webpack.DefinePlugin({
    MODE: JSON.stringify(MODE)
  })

  return [{
    mode: MODE,
    entry: scriptsEntry,
    output: {
      path: path.resolve(__dirname, scriprsOutput),
      filename: scriprsFilename
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
    entry: stylesEntry,
    output: {
      path: path.resolve(__dirname, stylesOutput),
      filename: stylesFilename
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
