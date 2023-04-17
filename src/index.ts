import { Complier, Json, Config, PluginClass } from 'render-builder';
import {
    getWebpackConfig
} from 'render-build-base-config';
import setSassStyleExpanded = require('./utils/setSassStyleExpanded');
import getDemoPath = require('./utils/getDemoPath');

import baseConfig = require("./configs/base");
import devConfig = require("./configs/dev");
import buildConfig = require("./configs/build");
const openBrowser = require('react-dev-utils/openBrowser');


export default class BuildComponentPlugin extends PluginClass {
    run(complier: Complier, config: Config, options: Json) {
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
        const demoDir = getDemoPath(rootDir);
        if (demoDir) {

            const params = {
                rootDir,
                pkg,
                https,
                demoDir
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
        } else {
            log.error('ERROR', 'Can not find demo folder for component development');
            process.exit(1)
        }


        return config
    }
}