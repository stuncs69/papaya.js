var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import colors from "colors";
import NetCore from "./networking";
import fs from "fs";
class PapayaConfig {
    constructor() {
        this.configuration = {
            dynamicPublics: false,
            allowClasses: false,
            port: 8080,
        };
    }
    config(configuration) {
        this.configuration = configuration;
    }
    logic() {
    }
    getConfiguration() {
        return this.configuration;
    }
}
class PapayaRoute {
    constructor() {
        this.path = "";
        this.callback = (req, res) => __awaiter(this, void 0, void 0, function* () { console.log("No callback!"); });
    }
}
class PapayaServer {
    constructor() {
        this.usedRoutes = [];
        this.configuration = {
            dynamicPublics: false,
            port: 8080,
            allowClasses: false,
        };
        const config = require(process.cwd() + "/config.papaya.ts");
        if (config.default) {
            let configClass = new config.default();
            configClass.logic();
            this.configuration = configClass.getConfiguration();
        }
        else {
            console.log(colors.bold(colors.red(`[!]`) + " No config.papaya.ts file found!"));
            process.exit(1);
        }
        this.networking = new NetCore(this.configuration.port);
    }
    listen() {
        this.networking = new NetCore(this.configuration.port);
        console.log(colors.bold(colors.blue("Starting Papaya.js Server...")));
        fs.readdirSync(process.cwd() + "/server/get").forEach((file) => {
            if (file.endsWith(".ts")) {
                const route = require(process.cwd() + `/server/get/${file}`);
                if (this.configuration.allowClasses) {
                    const x = new route.default();
                    if (x.path && x.callback) {
                        if (this.usedRoutes.includes(x.path)) {
                            console.log(colors.bold(colors.red(`[!]`) + " Duplicate route: " + x.path + " at " + file));
                            process.exit(1);
                        }
                        this.usedRoutes.push(x.path);
                        this.networking.addGet(x.path, x.callback);
                        console.log(colors.bold(colors.green(`[!]`) + " Added GET route: " + x.path));
                    }
                    else {
                        console.log(colors.bold(colors.red(`[!]`) + " Invalid route: " + file));
                        process.exit(1);
                    }
                }
                else {
                    if (this.usedRoutes.includes(route.default.path)) {
                        console.log(colors.bold(colors.red(`[!]`) + " Duplicate route: " + route.default.path + " at " + file));
                        process.exit(1);
                    }
                    this.usedRoutes.push(route.default.path);
                    this.networking.addGet(route.default.path, route.default.callback);
                    console.log(colors.bold(colors.green(`[!]`) + " Added GET route: " + route.default.path));
                }
            }
        });
        fs.readdirSync(process.cwd() + "/server/post").forEach((file) => {
            if (file.endsWith(".ts")) {
                const route = require(process.cwd() + `/server/post/${file}`);
                if (this.configuration.allowClasses) {
                    const x = new route.default();
                    if (x.path && x.callback) {
                        if (this.usedRoutes.includes(x.path)) {
                            console.log(colors.bold(colors.red(`[!]`) + " Duplicate route: " + x.path + " at " + file));
                            process.exit(1);
                        }
                        this.usedRoutes.push(x.path);
                        this.networking.addPost(x.path, x.callback);
                        console.log(colors.bold(colors.green(`[!]`) + " Added POST route: " + x.path));
                    }
                    else {
                        console.log(colors.bold(colors.red(`[!]`) + " Invalid route: " + file));
                        process.exit(1);
                    }
                }
                else {
                    if (this.usedRoutes.includes(route.default.path)) {
                        console.log(colors.bold(colors.red(`[!]`) + " Duplicate route: " + route.default.path + " at " + file));
                        process.exit(1);
                    }
                    this.usedRoutes.push(route.default.path);
                    this.networking.addPost(route.default.path, route.default.callback);
                    console.log(colors.bold(colors.green(`[!]`) + " Added POST route: " + route.default.path));
                }
            }
        });
        if (this.configuration.dynamicPublics) {
            this.networking.runDynamicPublics();
        }
        else {
            this.networking.addStaticPublics();
        }
        this.networking.listen();
    }
    use(middleware) {
        this.networking.addMiddleware(middleware);
    }
}
export { PapayaConfig, PapayaRoute, PapayaServer };
//# sourceMappingURL=classes.js.map