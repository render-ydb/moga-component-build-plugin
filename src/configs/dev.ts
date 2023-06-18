import setAssetsPath = require('../utils/setAssetsPath');
import { Json } from 'render-builder';
import Chain from 'webpack-chain';
import path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
import createDemoPathAndEntryPath = require('../utils/createDemoPathAndEntryPath');
import { APP_DEMO_DIR_PATH } from '../const';
export = (config: Chain, options: Json) => {
    const { https, rootDir, demoDir } = options;
    config.entryPoints.clear();
    createDemoPathAndEntryPath();
    config.merge({ entry: { index: APP_DEMO_DIR_PATH } });
    config.plugin('HtmlWebpackPlugin').use(HtmlWebpackPlugin, [
        {
            template: path.resolve(path.dirname(__dirname),"template","index.html"),
            filename: 'index.html',
        },
    ]);
  
    setAssetsPath(config, { js: 'js', css: 'css' });
  
    config.merge({
        devServer: {
            //   logLevel: 'silent',
        },
    });
    config.devServer
        .hot(true)
    // .disableHostCheck(true)
    // .clientLogLevel('error');

    config.devServer.https(Boolean(https));
};
