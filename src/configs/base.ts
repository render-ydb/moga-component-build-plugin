import path = require('path');

import Chain from 'webpack-chain';
import { ConfigParams } from '../types';
import setPxToViewport = require('../utils/setPxToViewport');


export = (config: Chain, {
  pkg,
  rootDir,
}: ConfigParams) => {
  config.target('web');
  config.context(rootDir);


  config.resolve.modules
    .add('node_modules')
    .add(path.join(rootDir, 'node_modules'))
    .add(path.resolve(__dirname, '../../node_modules'));

  // disable vendor
  config.optimization.splitChunks({ cacheGroups: {} });

  // remove CopyWebpackPlugin (component compile do not have public folder)
  config.plugins.delete('CopyWebpackPlugin');


  // add packagename to webpack alias
  ['.js', '.jsx', '.json', '.html', '.ts', '.tsx'].forEach((extension) => {
    config.resolve.extensions.add(extension);
  });
  config.resolve.alias.set(`${pkg.name}$`, path.resolve(rootDir, 'src/index'));

  // config.module.rule('jsx').test(/\.jsx?$/); // Issue: https://github.com/webpack/webpack/issues/4411
  config.output.filename('[name].js');

  setPxToViewport([
    'css',
    'css-module',
    'scss',
    'scss-module',
    'less',
    'less-module',
  ], config);
};
