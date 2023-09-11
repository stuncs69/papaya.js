interface Connection {
    IP: string,
    ID: string,
}

import { Elysia } from 'elysia';
import color from 'colors';

export default class NetCore {
    private connections: Array<Connection>;
    private server: Elysia;
    port: number;

    constructor(port: number) {
        this.connections = []
        this.server = new Elysia();
        this.port = port;
    }

    addGet(event: string, callback: any) {
        this.server.get(event, callback)
    }

    addPost(event: string, callback: any) {
        this.server.post(event, callback)
    }

    listen() {
        this.server
            .listen(this.port)
    }
}