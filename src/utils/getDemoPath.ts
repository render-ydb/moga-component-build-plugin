import fs = require("fs");
import path = require("path");

const getDemoPath = (projectDir: string) => {
    let demoDir: string = "";
    const searchDirs = ["demo", "docs", "example"];
    for (let i = 0; i < searchDirs.length; i++) {
        const searchPath = path.join(projectDir, searchDirs[i]);
        if (fs.existsSync(searchPath)) {
            demoDir = searchDirs[i];
            break;
        }
    }
    return demoDir;
};
export = getDemoPath;
