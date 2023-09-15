declare module 'chttps' {
    export class CHTTPServer {
        constructor(port: number);
        listen(): void;
        use(middleware: (req: any, res: any) => Promise<any>): void;
    }
}