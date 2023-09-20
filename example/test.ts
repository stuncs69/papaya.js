import { PapayaServer } from "../index";

const server = new PapayaServer();

server.use((req, res) => {
    console.log("Middleware!")
    return Promise.resolve();
})

server.listen();