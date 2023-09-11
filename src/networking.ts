interface Connection {
    IP: string,
    ID: string,
}

import { Elysia } from 'elysia';

export default class NetCore {
    private connections: Array<Connection>;
    private server: Elysia;
    port: number;

    constructor(port: number) {
        this.connections = []
        this.server = new Elysia();
        this.port = port;
    }

    listen() {
        this.server
            .get('/', () => 'Welcome to CHTTPS')
            .listen(this.port)
    }

}