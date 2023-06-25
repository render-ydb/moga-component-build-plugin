import path = require('path');

const CWD = process.cwd();
export const APP_DEMO_DIR_PATH = path.resolve(CWD, 'node_modules', 'moga-app-demo');
export const APP_ENTRY_PATH = path.resolve(APP_DEMO_DIR_PATH, 'index.jsx');
export const SCHEMA_PATH = path.resolve(CWD, 'schema.json');
