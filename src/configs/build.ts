import setAssetsPath = require('../utils/setAssetsPath');
import Chain from 'webpack-chain';
import path = require('path');
import getDemoEntryFilename = require('../utils/getDemoEntryFilename');
import { ConfigParams } from '../types';
import TypeGenWebpackPlugin from 'type-gen-webpack-plugin';
import EsmGenWebpackPlugin from 'esm-gen-webpack-plugin';
import setInlineStyle = require('../utils/setInlineStyle');

export = (config: Chain, options: ConfigParams) => {
  const { rootDir, pluginOptions = {} } = options;
  const appIndexPath = path.resolve(rootDir as string, 'src');
  const entryFileName = getDemoEntryFilename(path.resolve(appIndexPath, 'src'));
  const entryPath = path.join(appIndexPath, entryFileName);
  const appPkg = path.join(rootDir, 'package.json');
  config.entryPoints.clear();
  config.merge({ entry: { index: entryPath } });
  setAssetsPath(config);
  const outputPath = path.resolve(rootDir as string, 'dist');

  config.output
    .path(outputPath)
    .filename('index.js')
    .library(require(appPkg).name)
    .libraryTarget('umd')
    .umdNamedDefine(false);

  // 生成ts类型文件
  config
    .plugin('TypeGenWebpackPlugin')
    .use(TypeGenWebpackPlugin);

  // 输出esm和cjs规范下的react组件并生成ts类型文件
  config
    .plugin('EsmGenWebpackPlugin')
    .use(EsmGenWebpackPlugin);

  config
    .externals({
      react: {
        commonjs: 'react',
        commonjs2: 'react',
        amd: 'React',
        root: 'React',
      },
      'react-dom': {
        commonjs: 'react-dom',
        commonjs2: 'react-dom',
        amd: 'ReactDOM',
        root: 'ReactDOM',
      },
    });
  // @ts-ignore
  pluginOptions.inlineStyle && setInlineStyle([
    'css',
    'css-module',
    'scss',
    'scss-module',
    'less',
    'less-module',
  ], config);
};
