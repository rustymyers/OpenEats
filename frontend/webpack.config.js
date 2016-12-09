var webpack = require('webpack');
var isProd = (process.env.NODE_ENV === 'production');

// http://jonnyreeves.co.uk/2016/simple-webpack-prod-and-dev-config/
function getPlugins() {
  var plugins;

  plugins = [];

  plugins.push(new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }
  }));

  if (isProd) {
    plugins.push(new webpack.optimize.DedupePlugin());
    plugins.push(new webpack.optimize.OccurrenceOrderPlugin());
    plugins.push(new webpack.optimize.UglifyJsPlugin());
  }

  return plugins;
}

module.exports = {
  entry: './modules/index.js',

  output: {
    path: 'public',
    filename: 'bundle.js',
    publicPath: '/'
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader?presets[]=es2015&presets[]=react'
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      },
      {
        test: /\.scss$/,
        loaders: ["style", "css", "sass"]
      },
    ],
  },

  devServer: {
    historyApiFallback: true,
    inline: true,
    host: "0.0.0.0",
    port: "8080"
  },

  plugins: getPlugins()
};
