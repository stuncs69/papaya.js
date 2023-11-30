var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import https from "https";
import color from 'colors';
import fs from "fs";
export default class NetCore {
    constructor(port) {
        this.listening = false;
        this.middleware = [];
        this.paths = [];
        this.connections = [];
        this.server = https.createServer();
        this.port = port;
    }
    runMiddleware(req, res, middleware) {
        return __awaiter(this, void 0, void 0, function* () {
            let middlewareData = {};
            for (const middlewareItem of middleware) {
                try {
                    const data = yield middlewareItem(req, res);
                    middlewareData[middlewareItem.name] = data;
                }
                catch (error) {
                    console.error(`Error in middleware ${middlewareItem.name}: ${error.message}`);
                }
            }
            return middlewareData;
        });
    }
    addGet(path, callback) {
        if (this.paths.includes(path))
            return;
        this.paths.push(path);
        this.server.on("request", (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            if (req.method == "GET" && ((_a = req.url) === null || _a === void 0 ? void 0 : _a.split("?")[0]) == path) {
                console.log(color.bold(color.green(`[!]`) + " GET request at " + path));
                const middlewareData = yield this.runMiddleware(req, res, this.middleware);
                callback(req, res, middlewareData).then((data) => {
                    res.setHeader("Content-Type", "text/html");
                    res.end(data.toString());
                });
                ;
            }
        }));
    }
    addPost(path, callback) {
        if (this.paths.includes(path))
            return;
        this.paths.push(path);
        this.server.on("request", (req, res) => __awaiter(this, void 0, void 0, function* () {
            if (req.method == "POST" && req.url == path) {
                console.log(color.bold(color.green(`[!]`) + " POST request at " + path));
                const middlewareData = yield this.runMiddleware(req, res, this.middleware);
                callback(req, res, middlewareData).then((data) => {
                    res.end(data.toString());
                });
            }
        }));
    }
    returnMimeType(ext) {
        const contentTypes = {
            ttf: "font/ttf",
            woff: "font/woff",
            woff2: "font/woff2",
            eot: "font/eot",
            otf: "font/otf",
            svg: "image/svg+xml",
            png: "image/png",
            jpg: "image/jpeg",
            ico: "image/x-icon",
            gif: "image/gif",
            css: "text/css",
            js: "text/javascript",
            html: "text/html",
            txt: "text/plain",
            json: "application/json",
            pdf: "application/pdf",
            mp3: "audio/mpeg",
            mp4: "video/mp4",
            webm: "video/webm",
            xml: "application/xml",
            zip: "application/zip",
            rar: "application/x-rar-compressed",
            tar: "application/x-tar",
            "7z": "application/x-7z-compressed",
            exe: "application/x-msdownload",
            psd: "image/vnd.adobe.photoshop",
            ai: "application/postscript",
            eps: "application/postscript",
            ps: "application/postscript",
            doc: "application/msword",
            docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            xls: "application/vnd.ms-excel",
            xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            ppt: "application/vnd.ms-powerpoint",
        };
        const contentType = contentTypes[ext];
        if (contentType) {
            return contentType;
        }
        else {
            return "text/plain";
        }
    }
    addStaticPublics() {
        fs.readdir("./server/public/", (err, files) => {
            if (err)
                throw err;
            for (const file in files) {
                fs.readFile(process.cwd() + `/server/public/${files[file]}`, (err, data) => {
                    if (err)
                        throw err;
                    console.log(color.bold(color.green(`[!]`) + " Added public file: " + files[file]));
                    this.server.on("request", (req, res) => {
                        if (req.method == "GET" && req.url == "/" + files[file]) {
                            res.setHeader("Content-Type", this.returnMimeType(files[file].split(".")[1]));
                            res.end(data, "binary");
                        }
                    });
                });
            }
        });
    }
    runDynamicPublics() {
        this.server.on("request", (req, res) => {
            var _a;
            if (req.method == "GET") {
                console.log(color.bold(color.green(`[!]`) + " GET request at " + req.url));
                if (this.paths.includes((_a = req.url) === null || _a === void 0 ? void 0 : _a.split("?")[0]))
                    return;
                fs.readFile(process.cwd() + `/server/public/${req.url}`, (err, data) => {
                    if (err) {
                        res.statusCode = 404;
                        res.end("404 Not Found");
                    }
                    else {
                        res.setHeader("Content-Type", this.returnMimeType(req.url.split(".")[1]));
                        res.end(data, "binary");
                    }
                });
            }
        });
    }
    addMiddleware(middleware) {
        this.middleware.push(middleware);
        console.log(color.bold(color.green(`[!]`) + " Added middleware: " + middleware.name));
    }
    listen() {
        this.server.listen(this.port);
        this.listening = true;
        console.log(color.bold(color.blue("Papaya.js Server is listening on port " + this.port)));
    }
}
//# sourceMappingURL=networking.js.map