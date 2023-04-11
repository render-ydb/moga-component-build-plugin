import { Complier, Json, Config, PluginClass } from 'render-builder';
import {
    getWebpackConfig
} from 'render-build-base-config';
import setSassStyleExpanded = require('./utils/setSassStyleExpanded');
import getDemoPath = require('./utils/getDemoPath');
import getDemoEntryFilename = require('./utils/getDemoEntryFilename');
import getRightEntryExtname = require('./utils/getRightEntryExtname')
import path = require('path');
import fs = require("fs-extra");
import baseConfig = require("./configs/base");
import devConfig = require("./configs/dev");
import buildConfig = require("./configs/build");
const openBrowser = require('react-dev-utils/openBrowser');


export default class BuildComponentPlugin extends PluginClass {
    run(complier: Complier, config: Config, options: Json) {
        console.log("插件的options", options)
        const { context, log, hooks } = complier;
        const { command, pkg, commandArgs, rootDir } = context;
        const { htmlInjection, library, compileOptions } = options;
        const { https } = commandArgs;

        // 得到基础配置
        const mode = command === 'start' ? 'development' : 'production';
        const webpackConfig = getWebpackConfig(mode, config);

        setSassStyleExpanded(webpackConfig);
        const demoDir = getDemoPath(rootDir);
        if (demoDir) {

            console.log("webpackConfig", webpackConfig.toConfig().module);
            // 设置相关的入口文件
            const params = {
                rootDir,
                pkg,
                https,
                entry: {},
                demoDir
            };

            const entryFileName = getDemoEntryFilename(path.resolve(rootDir, demoDir));
            console.log("entryFileName", entryFileName)
            const entryPath = path.join(rootDir, demoDir, entryFileName);
            params.entry = { index: entryPath };
            baseConfig(config, params);
            if (command === 'start') {
                // component dev
                devConfig(config, params);
            } else if (command === 'build') {
                // component build
                buildConfig(config, params);
            }

            // const extNames = getRightEntryExtname(path.resolve(rootDir, 'src/'));
            // console.log("extNames", extNames)
          
           

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