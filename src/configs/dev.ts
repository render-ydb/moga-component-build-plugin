import setAssetsPath = require('../utils/setAssetsPath');
import { Json } from 'render-builder';
import Chain from 'webpack-chain';
import path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
import createDemoPathAndEntryPath = require('../utils/createDemoPathAndEntryPath');
import { APP_DEMO_DIR_PATH } from '../const';
import { ConfigParams } from '../types';
export = (config: Chain, options: ConfigParams) => {
    const { https, rootDir, pluginOptions} = options;
    const {headTags=[],bodyTags=[]} = pluginOptions || {};

    config.entryPoints.clear();
    createDemoPathAndEntryPath();
    config.merge({ entry: { index: APP_DEMO_DIR_PATH } });
    config.plugin('HtmlWebpackPlugin').use(HtmlWebpackPlugin, [
        {
            templateContent: ({ htmlWebpackPlugin }: { htmlWebpackPlugin: Record<string, any> }) => `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                ${htmlWebpackPlugin.tags.headTags}
                ${headTags.join('\n')}
                <title>Document</title>
            </head>
            <body>
                <div id="root"></div>
                ${bodyTags}
            </body>
            </html>
          `

        },
    ]);

    // remove the exclude configuration in babel-loader
    config.module.rule("js|mjs|jsx|ts|tsx").exclude.clear()

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
