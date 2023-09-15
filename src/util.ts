import fs from "fs";

interface Request {
    request: {
        url: string,
        method: string,
        headers: {
            [key: string]: string
        }
    },
}

function getPublicFileContents(path: string): Promise<string> {
    return new Promise((resolve, reject) => {
        fs.readFile("./server/public/" + path, (err, data) => {
            if (err) reject(err);
            resolve(data.toString());
        })
    })
}

export { getPublicFileContents }