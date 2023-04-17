import setAssetsPath = require('../utils/setAssetsPath');
import { Json } from 'render-builder';
import Chain from 'webpack-chain';
import path = require('path');
import getDemoEntryFilename = require('../utils/getDemoEntryFilename');

export = (config: Chain, options: Json) => {
    const { rootDir } = options;
    const entryFileName = getDemoEntryFilename(path.resolve(rootDir as string, 'src'));
    const entryPath = path.join(rootDir as string, 'src', entryFileName);
    config.entryPoints.clear();
    config.merge({ entry: { index: entryPath } });
    setAssetsPath(config);
    const outputPath = path.resolve(rootDir as string, 'build');
    config.output
        .path(outputPath)
        .filename('[name].js')
        .library('MyComponent')
        .libraryTarget('umd');

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
};
