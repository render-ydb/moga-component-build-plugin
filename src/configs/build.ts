import setAssetsPath = require("../utils/setAssetsPath");
import Chain from "webpack-chain";
import path = require("path");
import getDemoEntryFilename = require("../utils/getDemoEntryFilename");
import { ConfigParams } from "../types";

export = (config: Chain, options: ConfigParams) => {
    const { rootDir } = options;
    const appIndexPath = path.resolve(rootDir as string, "src");
    const entryFileName = getDemoEntryFilename(path.resolve(appIndexPath, "src"));
    const entryPath = path.join(appIndexPath, entryFileName);
    config.entryPoints.clear();
    config.merge({ entry: { index: entryPath } });
    setAssetsPath(config);
    const outputPath = path.resolve(rootDir as string, "build");
    config.output
        .path(outputPath)
        .filename("[name].js")
        .library("MyComponent")
        .libraryTarget("umd");

    config
        .externals({
            react: {
                commonjs: "react",
                commonjs2: "react",
                amd: "React",
                root: "React",
            },
            "react-dom": {
                commonjs: "react-dom",
                commonjs2: "react-dom",
                amd: "ReactDOM",
                root: "ReactDOM",
            },
        });
};
