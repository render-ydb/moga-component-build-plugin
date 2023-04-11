const path = require('path');
const { last } = require('lodash');
import Chain from 'webpack-chain';
function getFilename(filePath:string) {
  return last((filePath || '').split('/'));
}

export = function setAssetsPath(
  config:Chain,
  outputAssetsPath = { js: '', css: '' },
) {
  const filename = getFilename(config.output.get('filename'));
  config.output.filename(path.join(outputAssetsPath.js, filename));
  const options = config.plugin('MiniCssExtractPlugin').get('args')[0];
  config.plugin('MiniCssExtractPlugin').tap(args => [
    // @ts-ignore
    Object.assign(...args, {
      filename: path.join(outputAssetsPath.css, getFilename(options.filename)),
    }),
  ]);
};
