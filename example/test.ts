import { PapayaServer } from "../index";

const server = new PapayaServer(8080);

server.use((req, res) => {
    console.log("Middleware!")
    return Promise.resolve();
})

server.listen();