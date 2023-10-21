import { Settings } from "./interfaces";
import colors from "colors";
import NetCore from "./networking"
import fs from "fs"

/**
 * The class used to configure your Papaya.js server.
 * ```ts
import { PapayaConfig, Settings } from "papaya.js";

export default class Config extends PapayaConfig {
    configuration: Settings = {
        dynamicPublics: true,
        allowClasses: true,
        port: 3000,
    }
    logic() {
        console.log("Config loaded!")
    }
}
 * ```
 */
class PapayaConfig {
    configuration: Settings = {
        dynamicPublics: false,
        allowClasses: false,
        port: 8080,
    };

    constructor() {}

    config(configuration: Settings) {
        this.configuration = configuration;
    }

    logic() {
        // no logic applied
    }

    getConfiguration() {
        return this.configuration;
    }
}

/**
 * The class used to create routes. This is what you will use to create routes.
 * ```ts
export default class GetIndex extends PapayaRoute {
    path = "/";
    callback = () => {
        return new Promise((resolve) => {
            resolve(renderPublic("index.html"));
        })
    };
}
 * ```
 */
class PapayaRoute {
    path: string = "";
    callback: (req: any, res: any) => Promise<any> = async (req, res) => {console.log("No callback!")};
}

/**
 * The main class of Papaya.js. This is what you will use to start your server.
 * ```ts
 * import { PapayaServer } from "papaya.js";
 * const server = new PapayaServer();
 * ```
 */
class PapayaServer {
    private networking: any;
    private usedRoutes: Array<string> = [];
    private configuration: Settings = {
        dynamicPublics: false,
        port: 8080,
        allowClasses: false,
    };
    
    constructor() {
        const config = require(process.cwd() + "/config.papaya.ts");
        if (config.default) {
            let configClass = new config.default();
            configClass.logic();
            this.configuration = configClass.getConfiguration();
        } else {
            console.log(colors.bold(colors.red(`[!]`) + " No config.papaya.ts file found!"))
            process.exit(1);
        }
        this.networking = new NetCore(this.configuration.port);
    }

    /**
     * Starts the server.
     */
    listen() {
        this.networking = new NetCore(this.configuration.port);

        console.log(colors.bold(colors.blue("Starting Papaya.js Server...")))

        fs.readdirSync(process.cwd() + "/server/get").forEach((file) => {
            if (file.endsWith(".ts")) {
                const route = require(process.cwd() +  `/server/get/${file}`);
                if (this.configuration.allowClasses) {
                    const x = new route.default();

                    if (x.path && x.callback) {
                        if (this.usedRoutes.includes(x.path)) {
                            console.log(colors.bold(colors.red(`[!]`) + " Duplicate route: " + x.path + " at " + file))
                            process.exit(1);
                        }
                        this.usedRoutes.push(x.path)
                        this.networking.addGet(x.path, x.callback)
                        console.log(colors.bold(colors.green(`[!]`) + " Added GET route: " + x.path))
                    } else {
                        console.log(colors.bold(colors.red(`[!]`) + " Invalid route: " + file))
                        process.exit(1);
                    }
                } else {
                    if (this.usedRoutes.includes(route.default.path)) {
                        console.log(colors.bold(colors.red(`[!]`) + " Duplicate route: " + route.default.path + " at " + file))
                        process.exit(1);
                    }
                    this.usedRoutes.push(route.default.path)
                    this.networking.addGet(route.default.path, route.default.callback)
                    console.log(colors.bold(colors.green(`[!]`) + " Added GET route: " + route.default.path))                    
                }

            }
        })

        fs.readdirSync(process.cwd() + "/server/post").forEach((file) => {
            if (file.endsWith(".ts")) {
                const route = require(process.cwd() +  `/server/post/${file}`);
                if (this.configuration.allowClasses) {
                    const x = new route.default();

                    if (x.path && x.callback) {
                        if (this.usedRoutes.includes(x.path)) {
                            console.log(colors.bold(colors.red(`[!]`) + " Duplicate route: " + x.path + " at " + file))
                            process.exit(1);
                        }
                        this.usedRoutes.push(x.path)
                        this.networking.addPost(x.path, x.callback)
                        console.log(colors.bold(colors.green(`[!]`) + " Added POST route: " + x.path))
                    } else {
                        console.log(colors.bold(colors.red(`[!]`) + " Invalid route: " + file))
                        process.exit(1);
                    }
                } else {
                    if (this.usedRoutes.includes(route.default.path)) {
                        console.log(colors.bold(colors.red(`[!]`) + " Duplicate route: " + route.default.path + " at " + file))
                        process.exit(1);
                    }
                    this.usedRoutes.push(route.default.path)
                    this.networking.addPost(route.default.path, route.default.callback)
                    console.log(colors.bold(colors.green(`[!]`) + " Added POST route: " + route.default.path))                    
                }

            }
        })

        if (this.configuration.dynamicPublics) {
            this.networking.runDynamicPublics();
        } else {
            this.networking.addStaticPublics();
        }
        this.networking.listen();
    }

    /**
     * 
     * @param middleware The function with the middleware to use.
     * ## Make sure to use promises!
     */
    use(middleware: (req: any, res: any) => Promise<any>) {
        this.networking.addMiddleware(middleware);
    }
}

export { PapayaConfig, PapayaRoute, PapayaServer }