import path = require('path');
import { Json } from 'render-builder';
import Chain from 'webpack-chain';
const HtmlWebpackPlugin = require('html-webpack-plugin');

interface BaseOptions  {
  pkg: Json;
  rootDir:string;
  entry:Json;
  demoDir:string
}

export = (config: Chain, {
  pkg,
  rootDir,
  entry,
  demoDir
}:BaseOptions) => {
  config.target('web');
  config.context(rootDir);

  // modify entry
  config.entryPoints.clear();
  config.merge({ entry });
  config.plugin('HtmlWebpackPlugin').use(HtmlWebpackPlugin, [
    {
      template: require.resolve(path.resolve(rootDir,demoDir,'index.html')),
      filename: 'index.html',
    },
  ]);



  config.resolve.modules
    .add('node_modules')
    .add(path.join(rootDir, 'node_modules'))
    .add(path.resolve(__dirname, '../../node_modules'));

  ['jsx', 'tsx'].forEach((rule) => {
    config.module
      .rule(rule)
      .exclude.clear()
      .add(/node_modules/)
      .end()
      .use('babel-loader')
  });

  // disable vendor
  config.optimization.splitChunks({ cacheGroups: {} });
  // remove CopyWebpackPlugin (component compile do not have public folder)
  config.plugins.delete('CopyWebpackPlugin');
 
  
  // add packagename to webpack alias
  ['.js', '.jsx', '.json', '.html', '.ts', '.tsx'].forEach((extension) => {
    config.resolve.extensions.add(extension);
  });
  config.resolve.alias.set(`${pkg.name}$`, path.resolve(rootDir, 'src/index'));

  config.module.rule('jsx').test(/\.jsx?$/); // Issue: https://github.com/webpack/webpack/issues/4411
  config.output.filename('[name].js');
};
