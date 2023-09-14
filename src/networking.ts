interface Connection {
    IP: string,
    ID: string,
}

import https from "https";
import color from 'colors';

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

    listen() {
        this.server.listen(this.port);
        this.listening = true;
    }
}