import fs from "fs";
import ejs from "ejs";

function renderPublic(path: string): Promise<string> {
    return new Promise((resolve, reject) => {
        fs.readFile(process.cwd() + "/server/public/" + path, (err, data) => {
            if (err) reject(err);
            resolve(data.toString());
        })
    })
}

function renderEJS(path: string, ejsData: any): Promise<string> {
    return new Promise((resolve, reject) => {
        renderPublic(path).then((ejsTemplate) => {
            resolve(ejs.render(ejsTemplate, ejsData));
        }).catch((err) => {
            reject(err);
        })
    })
}

function extractGetParameters(request: Request): any {
    let getParams: any = {};
    const url = new URL(`http://localhost${request.url}`);
    url.searchParams.forEach((value, key) => {
        getParams[key] = decodeURIComponent(value);
    });
    return getParams;
}

export { renderPublic, renderEJS, extractGetParameters }