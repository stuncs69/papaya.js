import NetCore from "./src/networking";
import { getPublicFileContents } from "./src/util";
import fs from "fs";
import colors from "colors";
import process from "process";

interface Settings {
    dynamicPublics: boolean,
}

class PapayaServer {
    private networking: any;
    private usedRoutes: Array<string> = [];
    private configuration: Settings = {
        dynamicPublics: false,
    };
    
    constructor(port: number) {
        this.networking = new NetCore(port);
    }

    config(configuration: Settings) {
        this.configuration = configuration;
    }

    listen() {
        console.log(colors.bold(colors.blue("Starting Papaya.js Server...")))

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

        if (this.configuration.dynamicPublics) {
            this.networking.runDynamicPublics();
        } else {
            this.networking.addStaticPublics();
        }
        this.networking.listen();
    }

    use(middleware: (req: any, res: any) => Promise<any>) {
        this.networking.addMiddleware(middleware);
    }
}

export { PapayaServer, getPublicFileContents };