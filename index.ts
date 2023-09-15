import NetCore from "./src/networking";
import fs from "fs";
import colors from "colors";
import process from "process";

export class CHTTPServer {
    private port: number;
    private networking: NetCore;
    private usedRoutes: Array<string> = [];
    
    constructor(port: number) {
        this.port = port;
        this.networking = new NetCore(port);

        this.networking.addPublics();

        console.log(colors.bold(colors.blue("Starting CHTTPS Server...")))

        fs.readdirSync(process.cwd() + "/server/get").forEach((file) => {
            if (file.endsWith(".ts")) {
                const route = require(process.cwd() +  `/server/get/${file}`);
                if (this.usedRoutes.includes(route.default.path)) {
                    console.log(colors.bold(colors.red(`[!]`) + " Duplicate route: " + route.default.path + " at " + file))
                    process.exit(1);
                }
                this.usedRoutes.push(route.default.path)
                this.networking.addGet(route.default.path, route.default.callback)
                console.log(colors.bold(colors.green(`[!]`) + " Added GET route: " + route.default.path))
            }
        })

        fs.readdirSync(process.cwd() + "/server/post").forEach((file) => {
            if (file.endsWith(".ts")) {
                const route = require(process.cwd() + `/server/post/${file}`);
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