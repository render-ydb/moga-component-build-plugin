import fse = require('fs-extra');
import { APP_DEMO_DIR_PATH, APP_ENTRY_PATH } from '../const';
import getSourceCode = require('./getSourceCode');

export = () => {
  fse.ensureDirSync(APP_DEMO_DIR_PATH);
  fse.writeFileSync(APP_ENTRY_PATH, getSourceCode(), { encoding: 'utf-8' });
};
