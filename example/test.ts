import { PapayaServer } from "../index";

const server = new PapayaServer();

server.use((req, res) => {
    return new Promise(resolve => {
        console.log("yes buddy")
        resolve(null)
    })
})

server.listen();