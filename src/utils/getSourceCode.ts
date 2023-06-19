import path = require("path");
import getPropsData = require("./getPropsData");


const getSourceCode = () => {
    const propsData = getPropsData();
    const code = `
import { createRoot } from 'react-dom/client';
import App from '${path.resolve(process.cwd(), "src")}'
const rest = ${JSON.stringify(propsData)};
createRoot(
    document.getElementById('root')
).render(
     <App {...rest}/>
);`
    return code
}

export = getSourceCode;