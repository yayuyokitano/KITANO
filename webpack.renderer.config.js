const rules = require('./webpack.rules');
const plugins = require('./webpack.plugins');

rules.push({
  test: /\.css$/,
  exclude: /\.lazy\.css$/i,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
},
{
  test: /\.lazy\.css$/i,
  use: [
    { loader: 'style-loader', options: { injectType: 'lazyStyleTag' } },
    'css-loader',
  ],
});

module.exports = {
  module: {
    rules,
  },
  plugins: plugins,
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css']
  },
};
