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

    constructor(port: number) {
        this.connections = []
        this.server = https.createServer();
        this.port = port;
    }

    addGet(path: string, callback: Function) {
        this.server.on("request", (req, res) => {
            if (req.method == "GET" && req.url == path) {
                console.log(color.bold(color.green(`[!]`) + " GET request from " + req.socket.remoteAddress + " at " + path))
                callback(req, res).then((data: any) => {
                    res.setHeader("Content-Type", "text/html")
                    res.end(data.toString());
                });;
            }
        })
    }

    addPost(path: string, callback: Function) {
        this.server.on("request", (req, res) => {
            if (req.method == "POST" && req.url == path) {
                console.log(color.bold(color.green(`[!]`) + " POST request from " + req.socket.remoteAddress + " at " + path))
                callback(req, res).then((data: any) => {
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

    listen() {
        this.server.listen(this.port);
        this.listening = true;
    }
}