import fs from "fs";

function getPublicFileContents(path: string): Promise<string> {
    return new Promise((resolve, reject) => {
        fs.readFile(process.cwd() + "/server/public/" + path, (err, data) => {
            if (err) reject(err);
            resolve(data.toString());
        })
    })
}

export { getPublicFileContents }