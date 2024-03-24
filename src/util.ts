import fs from "fs";
import ejs from "ejs";
import pug from "pug";

/**
 * Returns the contents of a file in the public folder
 * @param path Filename in the public folder
 * @returns Promise<string>
 */
function renderPublic(path: string): Promise<string> {
    return new Promise((resolve, reject) => {
        fs.readFile(process.cwd() + "/server/public/" + path, (err, data) => {
            if (err) reject(err);
            resolve(data.toString());
        })
    })
}

/**
 * Renders a file to HTML with given data.
 * @param path Filename in the public folder
 * @param data Object containing EJS/Pug data.
 * @returns 
 */
function render(path: string, data: any): Promise<string> {
    return new Promise((resolve, _reject) => {
        switch(true) {
            case path.endsWith("pug"):
                let x = pug.compileFile(`server/public/${path}`)
                resolve(x(data))
                break;
            case path.endsWith("ejs"):
                renderEJS(path, data).then(result => resolve(result))
                break;
            default:
                renderPublic(path).then(result => resolve(result))
        }
    })
}

/**
 * Renders an EJS file to HTML with given data.
 * @param path Filename in the public folder
 * @param ejsData Object containing EJS data.
 * @returns 
 */
function renderEJS(path: string, ejsData: any): Promise<string> {
    return new Promise((resolve, reject) => {
        renderPublic(path).then((ejsTemplate) => {
            resolve(ejs.render(ejsTemplate, ejsData));
        }).catch((err) => {
            reject(err);
        })
    })
}

/**
 * Extracts GET parameters from a request.
 * @param request Raw request object
 * @returns any
 */
function extractGetParameters(request: Request): any {
    let getParams: any = {};
    const url = new URL(`http://localhost${request.url}`);
    url.searchParams.forEach((value, key) => {
        getParams[key] = decodeURIComponent(value);
    });
    return getParams;
}

/**
 * Extracts POST body from a request.
 * @param request Raw request object
 * @returns Promise<any>
 */
function getPostBody(request: any): Promise<any> {
    return new Promise((resolve, _reject) => {
        let body = {};
        request.on("data", (data: any) => {
            body = JSON.parse(data.toString());
        })
        request.on("end", () => {
            resolve(body);
        })
    })
}

export { renderPublic, renderEJS, extractGetParameters, getPostBody, render }