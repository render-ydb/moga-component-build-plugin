import { Complier, Config, PluginClass } from 'render-builder';
import {
    getWebpackConfig
} from 'moga-app-base-webpack-config';
import setSassStyleExpanded = require('./utils/setSassStyleExpanded');
// import getDemoPath = require('./utils/getDemoPath');

import baseConfig = require("./configs/base");
import devConfig = require("./configs/dev");
import buildConfig = require("./configs/build");
import { PluginOptions ,ConfigParams} from './types';
const openBrowser = require('react-dev-utils/openBrowser');


export default class BuildComponentPlugin extends PluginClass<PluginOptions> {
    run(complier: Complier, config: Config, options:PluginOptions) {
        const {
            context,
            log,
            hooks,
        } = complier;
        const { command, pkg, commandArgs, rootDir } = context;
        const { https } = commandArgs;
     
        // 得到基础配置
        const mode = command === 'start' ? 'development' : 'production';
        const webpackConfig = getWebpackConfig(mode, config);

        setSassStyleExpanded(webpackConfig);
        // const demoDir = getDemoPath(rootDir);
        const params:ConfigParams = {
            rootDir,
            pkg,
            https:https as string,
            pluginOptions:options
        };


        baseConfig(config, params);
        if (command === 'start') {
            // component dev
            devConfig(config, params);
            
        } else if (command === 'build') {
            // component build
            buildConfig(config, params);
        }



        // @ts-ignore
        hooks.afterStartCompile.tap('afterStartCompile', ({ url, stats }) => {
            openBrowser(url)
        })

        return config
    }
}