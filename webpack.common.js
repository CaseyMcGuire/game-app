const path = require('path');
const entries = require("./entries");

module.exports = {
  entry: {
    ...entries
  },
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js", ".json"],
    modules: [
      // in order to use absolute paths, set the root folders.
      // In order for typescript to also compile, the project root must match the
      // 'base_url' field in tsconfig. In this case, this is './src/main/web-frontend'
      path.resolve('./src/main/web-frontend'),
      path.resolve('./node_modules')
    ]
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'src/main/resources/static/bundles')
  },
  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      {
        test: /\.tsx?$/,
        use: [
          // then run it through babel (to, for example, convert our graphql queries)
          {loader: 'babel-loader'},
          // first compile our typescript into javascript
          {loader: 'ts-loader',},
        ]
      },

      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader"
      }
    ]
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
  },
};