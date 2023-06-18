import { SCHEMA_PATH } from "../const";
import { Schema } from "../types";
import fse = require("fs-extra");

const getPropsData = () => {
    let schema: Schema = {};
    const schemaIsExist = fse.existsSync(SCHEMA_PATH);
    if (schemaIsExist) {
        schema = JSON.parse(fse.readFileSync(SCHEMA_PATH, { encoding: 'utf-8' }));
    }
    let schemaData = schema.properties ?? {};
    let PropsData: Record<string, any> = {};
    return Object.keys(schemaData).reduce((result, key) => {
        PropsData[key] = schemaData[key]?.mockValue;
        return result
    }, PropsData)
}
export = getPropsData;

