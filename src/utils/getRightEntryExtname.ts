import path = require('path');
import glob = require('glob');
import {
    REG_JS_INDEX,
    REG_SASS_INDEX,
    REG_LESS_INDEX,
} from "../configs/reg";
import { Json } from 'render-builder';

export = (cwd: string) => {
    const rootFilePaths = glob.sync('*', {
        cwd,
    });
    const extNames: Json = {};
    rootFilePaths.forEach(i => {
        if (REG_JS_INDEX.test(i) && !extNames.jsExt) {
            extNames.jsExt = path.extname(i);
        }
        if (!extNames.styleExt) {
            if (REG_SASS_INDEX.test(i)) {
                extNames.styleExt = path.extname(i);
                extNames.isSassLike = true;
            } else if (REG_LESS_INDEX.test(i)) {
                extNames.styleExt = path.extname(i);
                extNames.isLessLike = true;
            }
        }
    });

    return Object.keys(extNames).length && extNames;
};
