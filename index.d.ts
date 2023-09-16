declare module 'chttps' {

    /**
     * # PapayaServer
     * @param port Port to listen on
     * @returns PapayaServer
     */
    export class PapayaServer {
        constructor(port: number);
        listen(): void;
        use(middleware: (req: any, res: any) => Promise<any>): void;
    }
}