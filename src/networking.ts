import { Connection } from "./interfaces";

import https from "https";
import color from 'colors';
import fs from "fs";

/**
 * Networking core for internal networking handling.
 */
export default class NetCore {
    private connections: Array<Connection>;
    private server: https.Server;
    port: number;
    listening: boolean = false;
    private middleware: Array<Function> = [];
    private paths: Array<string> = [];

    constructor(port: number) {
        this.connections = []
        this.server = https.createServer();
        this.port = port;
    }
    
    /**
     * ## Run middleware and return data
     * @param req 
     * @param res 
     * @param middleware 
     * @returns 
     */
    private async runMiddleware(req: https.IncomingMessage, res: https.ServerResponse, middleware: Array<Function>) {
        let middlewareData: { [key: string]: any } = {};
        for (const middlewareItem of middleware) {
            try {
                const data = await middlewareItem(req, res);
                middlewareData[middlewareItem.name] = data;
            } catch (error: any) {
                console.error(`Error in middleware ${middlewareItem.name}: ${error.message}`);
            }
        }
        return middlewareData;
    }

    /**
     * ## Add a GET route
     * @param path 
     * @param callback 
     * @returns 
     */
    addGet(path: string, callback: Function) {
        if (this.paths.includes(path)) return;
        this.paths.push(path);
        this.server.on("request", async (req, res) => {
            if (req.method == "GET" && req.url?.split("?")[0] == path) {
                console.log(color.bold(color.green(`[!]`) + " GET request at " + path))
                const middlewareData = await this.runMiddleware(req, res, this.middleware);
                callback(req, res, middlewareData).then((data: any) => {
                    res.setHeader("Content-Type", "text/html")
                    res.end(data.toString());
                });;
            }
        })
    }

    /**
     * ## Add a POST route
     * @param path 
     * @param callback 
     * @returns 
     */
    addPost(path: string, callback: Function) {
        if (this.paths.includes(path)) return;
        this.paths.push(path);
        this.server.on("request", async (req, res) => {
            if (req.method == "POST" && req.url == path) {
                console.log(color.bold(color.green(`[!]`) + " POST request at " + path))
                const middlewareData = await this.runMiddleware(req, res, this.middleware);
                callback(req, res, middlewareData).then((data: any) => {
                    res.end(data.toString());
                });
            }
        })
    }
    
    /**
     * ## Return the MIME type of a file
     * @param ext 
     * @returns 
     */
    private returnMimeType(ext: string): string {
        const contentTypes: { [key: string]: string } = {
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
        } else {
            // Handle unsupported file types or set a default content type
            return "text/plain";
        }
    }

    /**
     * ## Add static public files
     */
    addStaticPublics() {
        fs.readdir("./server/public/", (err, files: Array<String>) => {
            if (err) throw err;
            for (const file in files) {
                fs.readFile(process.cwd() + `/server/public/${files[file]}`, (err, data) => {
                    if (err) throw err;
                    console.log(color.bold(color.green(`[!]`) + " Added public file: " + files[file]))
                    this.server.on("request", (req, res) => {
                        if (req.method == "GET" && req.url == "/" + files[file]) {
                            res.setHeader("Content-Type", this.returnMimeType(files[file].split(".")[1]))
                            res.end(data, "binary");
                        }
                    })
                })
            }
        })
    }

    /**
     * ## Run dynamic public files
     */
    runDynamicPublics() {
        this.server.on("request", (req, res) => {
            if (req.method == "GET") {
                console.log(color.bold(color.green(`[!]`) + " GET request at " + req.url))
                if (this.paths.includes(req.url?.split("?")[0] as string)) return;
                fs.readFile(process.cwd() + `/server/public/${req.url}`, (err, data) => {
                    if (err) {
                        res.statusCode = 404;
                        res.end("404 Not Found");
                    } else {
                        res.setHeader("Content-Type", this.returnMimeType((req.url as string).split(".")[1]))
                        res.end(data, "binary");
                    }
                })
            }
        })
    }

    /**
     * @param middleware The function with the middleware to use.
     */
    addMiddleware(middleware: (req: any, res: any) => Promise<void>) {
        this.middleware.push(middleware);
        console.log(this.middleware)
        console.log(color.bold(color.green(`[!]`) + " Added middleware: " + middleware.name))
    }    

    /**
     * ## Start listening
     */
    listen() {
        this.server.listen(this.port);
        this.listening = true;
        console.log(color.bold(color.blue("Papaya.js Server is listening on port " + this.port)))
    }
}