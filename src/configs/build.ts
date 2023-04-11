import path = require('path');
import setAssetsPath = require('../utils/setAssetsPath');
import { Json } from 'render-builder';
import Chain from 'webpack-chain';

export = (config:Chain, { rootDir }:Json) => {
  setAssetsPath(config);
  const outputPath = path.resolve(rootDir as string, 'build');
  config.output.path(outputPath);
};
