import fs from "fs";
import ejs from "ejs";
function renderPublic(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(process.cwd() + "/server/public/" + path, (err, data) => {
            if (err)
                reject(err);
            resolve(data.toString());
        });
    });
}
function renderEJS(path, ejsData) {
    return new Promise((resolve, reject) => {
        renderPublic(path).then((ejsTemplate) => {
            resolve(ejs.render(ejsTemplate, ejsData));
        }).catch((err) => {
            reject(err);
        });
    });
}
function extractGetParameters(request) {
    let getParams = {};
    const url = new URL(`http://localhost${request.url}`);
    url.searchParams.forEach((value, key) => {
        getParams[key] = decodeURIComponent(value);
    });
    return getParams;
}
function getPostBody(request) {
    return new Promise((resolve, reject) => {
        let body = {};
        request.on("data", (data) => {
            body = JSON.parse(data.toString());
        });
        request.on("end", () => {
            resolve(body);
        });
    });
}
export { renderPublic, renderEJS, extractGetParameters, getPostBody };
//# sourceMappingURL=util.js.map