import NetCore from "./src/networking";
import fs from "fs";
import colors from "colors";

console.log(colors.bold(colors.blue("Starting CHTTPS Server...")))

const x = new NetCore(3000);

fs.readdirSync("./server/get").forEach((file) => {
    if (file.endsWith(".ts")) {
        const route = require(`./server/get/${file}`);
        x.addGet(route.default.path, route.default.callback)
        console.log(colors.bold(colors.green(`[!]`) + " Added GET route: " + route.default.path))
    }
})

fs.readdirSync("./server/post").forEach((file) => {
    if (file.endsWith(".ts")) {
        const route = require(`./server/post/${file}`);
        x.addPost(route.default.path, route.default.callback)
        console.log(colors.bold(colors.green(`[!]`) + " Added POST route: " + route.default.path))
    }
})

x.listen();

console.log(colors.bold(colors.blue("Started CHTTPS Server. (listening for requests)")))