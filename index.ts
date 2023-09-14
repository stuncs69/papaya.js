import NetCore from "./src/networking";
import fs from "fs";
import colors from "colors";

console.log(colors.bold(colors.blue("Starting CHTTPS Server...")))

const x = new NetCore(3000);

let usedRoutes: Array<string> = [];

fs.readdirSync("./server/get").forEach((file) => {
    if (file.endsWith(".ts")) {
        const route = require(`./server/get/${file}`);
        if (usedRoutes.includes(route.default.path)) {
            console.log(colors.bold(colors.red(`[!]`) + " Duplicate route: " + route.default.path + " at " + file))
            process.exit(1);
        }
        usedRoutes.push(route.default.path)
        x.addGet(route.default.path, route.default.callback)
        console.log(colors.bold(colors.green(`[!]`) + " Added GET route: " + route.default.path))
    }
})

fs.readdirSync("./server/post").forEach((file) => {
    if (file.endsWith(".ts")) {
        const route = require(`./server/post/${file}`);
        if (usedRoutes.includes(route.default.path)) {
            console.log(colors.bold(colors.red(`[!]`) + " Duplicate route: " + route.default.path + " at " + file))
            process.exit(1);
        }
        usedRoutes.push(route.default.path)
        x.addPost(route.default.path, route.default.callback)
        console.log(colors.bold(colors.green(`[!]`) + " Added POST route: " + route.default.path))
    }
})

x.listen();

console.log(colors.bold(colors.blue("Started CHTTPS Server. (listening for requests)")))