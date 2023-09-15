import NetCore from "./src/networking";
import fs from "fs";
import colors from "colors";

export class CHTTPServer {
    private port: number;
    private networking: NetCore;
    private usedRoutes: Array<string> = [];

    constructor(port: number) {
        this.port = port;
        this.networking = new NetCore(port);

        this.networking.addPublics();

        console.log(colors.bold(colors.blue("Starting CHTTPS Server...")))

        fs.readdirSync("./server/get").forEach((file) => {
            if (file.endsWith(".ts")) {
                const route = require(`./server/get/${file}`);
                if (this.usedRoutes.includes(route.default.path)) {
                    console.log(colors.bold(colors.red(`[!]`) + " Duplicate route: " + route.default.path + " at " + file))
                    process.exit(1);
                }
                this.usedRoutes.push(route.default.path)
                this.networking.addGet(route.default.path, route.default.callback)
                console.log(colors.bold(colors.green(`[!]`) + " Added GET route: " + route.default.path))
            }
        })

        fs.readdirSync("./server/post").forEach((file) => {
            if (file.endsWith(".ts")) {
                const route = require(`./server/post/${file}`);
                if (this.usedRoutes.includes(route.default.path)) {
                    console.log(colors.bold(colors.red(`[!]`) + " Duplicate route: " + route.default.path + " at " + file))
                    process.exit(1);
                }
                this.usedRoutes.push(route.default.path)
                this.networking.addPost(route.default.path, route.default.callback)
                console.log(colors.bold(colors.green(`[!]`) + " Added POST route: " + route.default.path))
            }
        })
    }

    listen() {
        this.networking.listen();
    }

    use(middleware: (req: any, res: any) => Promise<any>) {
        this.networking.addMiddleware(middleware);
    }
}