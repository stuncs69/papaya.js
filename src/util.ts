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

function getPostBody(request: any): Promise<any> {
    return new Promise((resolve, reject) => {
        let body = {};
        request.on("data", (data: any) => {
            body = JSON.parse(data.toString());
        })
        request.on("end", () => {
            resolve(body);
        })
    })
}

export { renderPublic, renderEJS, extractGetParameters, getPostBody }