import setAssetsPath = require('../utils/setAssetsPath');
import { Json } from 'render-builder';
import Chain from 'webpack-chain';
import path = require('path');
import getDemoEntryFilename = require('../utils/getDemoEntryFilename');
const HtmlWebpackPlugin = require('html-webpack-plugin');
export = (config: Chain, options: Json) => {
    const { https, rootDir, demoDir } = options;
    // modify entry
    const entryFileName = getDemoEntryFilename(path.resolve(rootDir as string, demoDir as string));
    const entryPath = path.join(rootDir as string, demoDir as string, entryFileName);
    config.entryPoints.clear();
    config.merge({ entry: { index: entryPath } });

    config.plugin('HtmlWebpackPlugin').use(HtmlWebpackPlugin, [
        {
            template: require.resolve(path.resolve(rootDir as string, demoDir as string, 'index.html')),
            filename: 'index.html',
        },
    ]);


    setAssetsPath(config, { js: 'js', css: 'css' });
    // config loglevel
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
