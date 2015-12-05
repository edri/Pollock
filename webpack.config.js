var path = require('path');

module.exports = {
    entry: {
      app: './client/bootstrap.ts',
        angular2: [
            'es6-shim',
            'reflect-metadata',
            'angular2/angular2'
        ]
    },
    output: {
        path: path.resolve(__dirname, 'public/javascripts/'),
        filename: 'bundle.js',
        sourceMapFilename: 'boundle.map.js'
    },
    externals: {
        'angular': 'angular'
    },

// entry: {
//   'angular2': [
//     // Angular 2 Deps
//     // '@reactivex/rxjs',
//     // 'zone.js',
//     'reflect-metadata',
//     // to ensure these modules are grouped together in one file
//     'angular2/angular2',
//     'angular2/core',
//     'angular2/router',
//     'angular2/http'
//   ]
// },

  resolve: {
      extensions: ['','.ts','.js'],
      alias: {
          angular: 'node_modules/angular2'
  //       // 'common': 'src/common',
  //       // 'bindings': 'src/bindings',
  //       // 'components': 'src/app/components'
  //       // 'services': 'src/app/services',
  //       // 'stores': 'src/app/stores'
      }
    },
  module: {
    loaders: [
      { test: /\.tsx?$/, loader: 'ts-loader' }
    ]
  }
};
