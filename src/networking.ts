interface Connection {
    IP: string,
    ID: string,
}

import https from "https";
import color from 'colors';
import fs from "fs";

export default class NetCore {
    private connections: Array<Connection>;
    private server: https.Server;
    port: number;
    listening: boolean = false;
    private middleware: Array<Function> = [];

    constructor(port: number) {
        this.connections = []
        this.server = https.createServer();
        this.port = port;
    }
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
    

    addGet(path: string, callback: Function) {
        this.server.on("request", async (req, res) => {
            if (req.method == "GET" && req.url == path) {
                console.log(color.bold(color.green(`[!]`) + " GET request at " + path))
                const middlewareData = await this.runMiddleware(req, res, this.middleware);
                callback(req, res, middlewareData).then((data: any) => {
                    res.setHeader("Content-Type", "text/html")
                    res.end(data.toString());
                });;
            }
        })
    }

    addPost(path: string, callback: Function) {
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
    
    addPublics() {
        fs.readdir("./server/public/", (err, files: Array<String>) => {
            if (err) throw err;
            for (const file in files) {
                fs.readFile(`./server/public/${files[file]}`, (err, data) => {
                    if (err) throw err;
                    console.log(color.bold(color.green(`[!]`) + " Added public file: " + files[file]))
                    this.server.on("request", (req, res) => {
                        if (req.method == "GET" && req.url == "/" + files[file]) {
                            const ext = files[file].split(".")[1];
                            res.setHeader("Content-Type", `text/${ext}`)
                            res.end(data.toString());
                        }
                    })
                })
            }
        })
    }

    addMiddleware(middleware: (req: any, res: any) => Promise<void>) {
        this.middleware.push(middleware);
        console.log(color.bold(color.green(`[!]`) + " Added middleware: " + middleware.name))
    }    

    listen() {
        this.server.listen(this.port);
        this.listening = true;
    }
}