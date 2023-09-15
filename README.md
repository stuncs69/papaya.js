# chttps
Webserver made for TypeScript, using TypeScript.

```ts
import { CHTTPServer } from "chttps";

const server = new CHTTPServer(8080);

server.use(function testWare(req, res) {
    return new Promise((resolve, reject) => {
        resolve("TestData")
    })
})

server.listen();
```

## Functions
- Full [Bun](https://bun.sh/) support
    - Made using standard Node.js libraries, compatiable with [Bun](https://bun.sh/)
- Asynchronous and promised
    - Middleware and routes are made using promises, ensuring a blazingly fast server.
    - Public files are served asynchronously alongside coded paths.

